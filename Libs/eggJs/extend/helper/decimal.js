'use strict';

const Decimal = require('decimal.js');

module.exports = {
  /**
   * @description 加法
   * @param 加数a  加数b  保留位数 默认2
   */

  add(a, b, n = 2) {
    const result = new Decimal(a).add(new Decimal(b));
    return result.toFixed(n);
  },

  /**
   * @description 减法
   * @param a  b  保留位数 默认2
   */

  sub(a, b, n = 2) {
    const result = new Decimal(a).sub(new Decimal(b));
    return result.toFixed(n);
  },

  /**
   * @description 乘法
   * @param a  b  保留位数 默认2
   */

  mul(a, b, n = 2) {
    const result = new Decimal(a).mul(new Decimal(b));
    return result.toFixed(n);
  },

  /**
   * @description 除法
   * @param a  b  保留位数 默认2
   */

  div(a, b, n = 2) {
    const result = new Decimal(a).div(new Decimal(b));
    return result.toFixed(n);
  },
};
