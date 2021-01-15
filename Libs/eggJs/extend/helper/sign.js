'use strict';

const fs = require('fs');
const crypto = require('crypto');

module.exports = {
  /**
   * 根据参数(去掉sign)得到签名，和参数中的sign进行比对，一致即表示验证通过
   * @param {object} timestamp 第三方传过来的时间戳 s 
   * @returns {string}
   */
  createSign(timestamp, secret) {
    if (!timestamp) return;
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(timestamp);
    return hmac.digest('hex');
  },

  md5(string) {
    const hash = crypto.createHash('md5');
    hash.update(string);
    return hash.digest('hex');
  },

  async md5File(filepath) {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash('md5');
      const readStream = fs.createReadStream(filepath);
      readStream.on('data', (data) => {
        hash.update(data);
      });
      readStream.on('error', (err) => {
        reject(err);
      });
      readStream.on('end', () => {
        const md5 = hash.digest('hex');
        resolve(md5);
      });
    });
  },
};