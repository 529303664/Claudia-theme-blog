'use strict';

const DateHelper = require('./helper/date');
const Decimal = require('./helper/decimal');
const Sign = require('./helper/sign');
const ArrayHelper = require('./helper/array');
module.exports = {
  /**
   * @description 进程sleep
   * @param time time 延迟的时间,单位毫秒
   */

  async sleep(time = 200) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  },

  /**
   * @description 参数挂载sql查询条件
   * @param
   */

  mountWhere(params, where, keyArr) {
    keyArr.forEach(key => {
      if (params[key] !== undefined) {
        where[key] = params[key];
      }
    })
    return where;
  },  

  toHump(name) {
    return name.replace(/\_(\w)/g, function(all, letter) {
      return letter.toUpperCase();
    });
  },

  ...DateHelper,
  ...Decimal,
  ...Sign,
  ...ArrayHelper,
};
