'use strict';

const nodemailer = require('nodemailer');
const Service = require('egg').Service;
const fs = require('fs');
const bfs = require('@bigo/pure-bfs');
// 存储文件大小限制
const kb = n => n * 1024;
const mb = n => 1024 * kb(n);

class CommonService extends Service {
  /**
   * @description 公共的brpc服务
   * @param params brpc调用参数 {}
   * @param handler 当前处理人(用于上报)
   * @param port brpc 端口
   * @param isNameAgent 
   */
  async brpc(serverName, params = {}, handler = 'kebin', port = 41329) {
    const { app, config } = this;
    const { HTTP_BRPC_COMM_FILES_MAP, BRPC_IS_NAME_AGENT } = app.constant.brpcFiles;
    //默认为true
    const isAgent = BRPC_IS_NAME_AGENT[config.env] === undefined ? true : BRPC_IS_NAME_AGENT[config.env];
    const result = await app.brpc.send(serverName, HTTP_BRPC_COMM_FILES_MAP[config.env], {
      // seq_id: Math.floor(Math.random() * 1000),
      ...params
    }, handler, port, isAgent);
    return result;
  }

  /**
   * @description 发送邮件
   */
  async sendEmail(params) {
    const { app } = this;
    const { to, cc, subject, html } = params;
    const emailConf = app.constant.emailConf;
    const transporter = nodemailer.createTransport(emailConf);
    // send mail with defined transport object
    const result = await transporter.sendMail({
      from: emailConf.auth.user, // sender address
      // to: 'huangzepeng@bigo.sg, wenshuhua@bigo.sg', // list of receivers
      to, // list of receivers
      // cc,
      subject, // Subject line
      html, // html body
    });
    return result;
  }

  // 公共上传
  async commonUpload(files) {
    const { ctx } = this;
    const { storage } = this.config;
    const { BUCKET_NAME, BUCKET_KEY, BFS_URL } = storage;

    bfs.setPolicy({
      bucket: BUCKET_NAME,
      secretKey: BUCKET_KEY,
      fsizeLimit: [kb(0), mb(10)],
      expires: +(+new Date()).toString().slice(0, -3) + 50000,
      bfsUrl: BFS_URL,
    });

    const result = await Promise.all(files.map(file => {
      return bfs.bfsc(file.filepath)
    }));

    if (!result || !result.length) {
      return ctx.fail({ msg: '上传失败' });
    }

    return result;
  }

  async bufferUpload(buffers) {
    const { ctx } = this;
    const { storage } = this.config;
    const { BUCKET_NAME, BUCKET_KEY, BFS_URL } = storage;

    bfs.setPolicy({
      bucket: BUCKET_NAME,
      secretKey: BUCKET_KEY,
      fsizeLimit: [kb(0), mb(10)],
      expires: +(+new Date()).toString().slice(0, -3) + 50000,
      bfsUrl: BFS_URL,
    });

    const result = await Promise.all(buffers.map(buffer => {
      return bfs.bfsc(buffer)
    }));

    if (!result || !result.length) {
      return ctx.fail({ msg: '上传失败' });
    }

    return result;
  }

  /**
   * @description myshard 通过SQL语句获取唯一ID
   * @param sql SELECT @@uuid
   */
  async uuid(dbName) {
    const { app } = this;
    const result = await app[dbName].query('SELECT @@uuid');
    return Object.values(result[0][0])[0];
  }

  exportFile(filename, project = '') {

    const { ctx } = this;

    ctx.type = '.xlsx';
    ctx.body = fs.readFileSync(`output/${filename}/${filename}.xlsx`);

    try {
      var files = [];
      const dirPath = `output/${filename}`;

      if (fs.existsSync(dirPath)) {
        files = fs.readdirSync(dirPath);
        files.forEach(function (file, index) {
          var curPath = dirPath + "/" + file;
          fs.unlinkSync(curPath);
        });

        fs.rmdirSync(dirPath, (err) => {
          console.log(`[Error:${project} remove dir error] ===> ${err}`)
        });
      }
    } catch (e) { console.log(e.message) }
  }

  /**
   * 利用bs2上传文件
   * @deprecated 兼容旧版PHP的hk运营后台
   * @param {EggFile[]} files egg上传文件
   * @returns [ { filename, md5, mime, url, turl, size, ctime } ]
   */
  async phpBs2FileUpload(files) {
    const { ctx } = this;
    const BS2_COMMON_UPLOAD_URL = 'http://fs.calldev.bigo.sg/FileUploadDownload/upload_gift.php?cookie=AKor5RIPo/Un6Rpi/cD77liYBjnUrxzUsYXoZP94VrMpg3z/iug0LHI7aqBAUSkZEljG8MYn6DAFHq7PVWXQANC+sSQtXAaJw2G6wDXOoXtwH/ReJL7BC6kBXMGuchKyClhoUrfI7Pz56upTEbfZ/cN2kUaKAWONRKHzphm3NbS4AHDeJL4szdspZn44Ye+cn+PhKBJ85Vj/wGF5mYa/4NbqyF7ejvFx7pmrlX03kSzXmr9OQ57lMGLNfLraX+SypiWCHuD95BCY2LXcZxW09mXGfmIAoiJjuAPymEh0dBF1jLS6+HdaEi2rtFSQoPmzltoZ/5PjiIb8x5OVzE/dWdYJ8foo4OBI+LwYMpdVE04Ff4MC3O5Wy1ukjaazFlXpQgY6rnjjslWKIWsV15tPk/QdCxyEwDlMBUHgk91p+PJ2Al+/yWhrjvWYiFbbfrGICuEgWRm+V2byU8r7WaJVR/J8CZPbMhTqhi6+yzrUmOIfbwnuoqqQDm3C6LvUozYtO78w9l3nwEc=';
    let result;
    try {
      result = await Promise.all(files.map(file => {
        const { filepath } = file;
        return ctx.curl(BS2_COMMON_UPLOAD_URL, {
          data: {
            file: `@${file.filepath}`,
          },
          files: fs.createReadStream(filepath),
          method: 'POST',
          timeout: 5 * 60 * 1000,
        });
      }));
    } catch (error) {
      console.error('bs2上传失败', error);
      return ctx.fail({ msg: '上传失败' });
    }

    let data = [];
    if (result && result.length > 0) {
      try {
        data = result.map(res => JSON.parse(res.data.toString()));
      } catch (e) {
        return ctx.fail({ msg: '上传失败' });
      }
    }

    let imageInfoList = [];
    for (let i = 0; i < data.length; i++) {
      const { url, url_t } = data[i];
      const file = files[i];
      imageInfoList.push({
        filename: file.filename,
        md5: await ctx.helper.md5File(file.filepath),
        mime: file.mime,
        url, // 图片URL
        thumbUrl: url_t || url, // 缩略图URL
        size: fs.statSync(file.filepath).size, // 字节
        ctime: ctx.helper.time(),
      });
    }

    return imageInfoList;
  }
}

module.exports = CommonService;
