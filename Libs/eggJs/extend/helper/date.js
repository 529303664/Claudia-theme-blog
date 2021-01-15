'use strict';

module.exports = {
  /**
   * @description 转为时间戳，默认秒级
   * @param 日期字符串
   */

  transferTimeStamp(dateStr, dimension = 's') {
    const timeStamp = dateStr ? new Date(dateStr).getTime() : new Date().getTime();
    return dimension === 'ms' ? timeStamp : (~~(timeStamp / 1000));
  },

  /**
   * 格式化时间戳
   * formatTimeStamp(1151798944423,'yyyy-MM-dd hh:mm:ss') ==> 2006-07-02 08:09:04
   */
  formatTimeStamp(timeStamp, format = 'yyyy-MM-dd hh:mm:ss') {
    const date = new Date(timeStamp);
    const obj = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
    };

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
    }

    for (let key in obj) {
      if (new RegExp(`(${key})`).test(format)) {
        let item = obj[key];
        format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? item : (`00${item}`).substr(`${item}`.length));
      }
    }

    return format;
  },

  /**
   * 返回时间戳，单位为秒
   */
  time() {
    return ~~(Date.now() / 1000);
  },
};
