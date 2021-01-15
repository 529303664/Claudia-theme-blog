'use strict';
const { CODE_MESSAGES } = require('../constant/code');

module.exports = {
  async httpReq({ url, method = 'GET', data = {} }) {
    console.log(`HTTP ${method}: ${url} | ${JSON.stringify(data)}`);

    const res = await this.curl(url, {
      contentType: 'json',
      dataType: 'json',
      method,
      timeout: 5 * 60 * 1000,
      data,
    });

    console.log(`HTTP ${method}: ${url} : responce : `, res)

    return res;
  },

  /**
   * @description 成功返回
   * @param {*} { status = 200, message, data = {} }
   */

  success({ code = 0, status = 200, msg, data = {} }) {
    this.body = {
      code,
      status,
      data,
      msg: msg || CODE_MESSAGES[code],
      success: true,
    };
  },

  /**
   * @description 返回失败
   * @param {*} { code = 0, msg, data = {} }
   */

  fail({ code = -1, msg, data = {} }) {
    this.body = {
      code,
      data,
      msg: msg || CODE_MESSAGES[code],
      success: false,
    };
  },
  /**
   * @description 捕获并提取Promise错误对象
   * @param promise
   * @return [err, res]
   */
  catch(promise) {
    return promise.then(data => [null, data]).catch(error => [error, null]);
  },
};
