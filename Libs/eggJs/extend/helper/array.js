'use strict';

const _ = require('lodash');

module.exports = {
  // 把一个数组分割为新的数组块
  arrChunk(arr, chunk) {
    let i,j;
    const temparray = [];

    for (i = 0,j = arr.length; i < j; i += chunk) {
      temparray.push(arr.slice(i, i + chunk));
    }

    return temparray;
  },
  isUndefined(v) {
    return typeof v === 'undefined';
  },
  /**
   * @desc 返回数组的某一列 or 返回以数组某列为key的map
   * @examples
   *  const source = [
        { id: 1, name: 'name1', no: 11 },
        { id: 2, name: 'name2', no: 12 },
      ];
      1.
      const arr = arrColumn(source, 'id')
      => [1, 2]
      2.
      const arr = arrColumn(source, ['id', 'name'])
      => [
        { id: 1, name: 'name1' },
        { id: 2, name: 'name2' },
      ];
      3.
      const arr = arrColumn(source, null, 'id')
      => {
        1: { id: 1, name: 'name1' },
        2: { id: 2, name: 'name2' }
      }
   */
  arrColumn(source = [], field, key) {
    let data = [];

    for (let sourceV of source) {
      if (typeof field !== 'string') {
        let item = {};
        if (_.isArray(field)) {
          for (let fieldV of field) {
            if (sourceV[fieldV]) {
              item[fieldV] = sourceV[fieldV];
            }
          }
        } else if (!field) {
          item = sourceV;
        }

        if (key && sourceV[key]) {
          if (_.isArray(data)) data = {};
          data[sourceV[key]] = item;
        } else {
          data.push(item);
        }
      } else {
        if (sourceV[field]) {
          data.push(sourceV[field]);
        }
      }
    }

    return data;
  },
};
