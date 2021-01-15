import * as is from './is';
import { findLast } from 'lodash'
/**
 * 遍历对象将key和value 一一取出
 * @param {*} obj 
 * @param {*} name 
 * @param {*} res 
 */
export const travelObject = function(obj, name, res, options = {}) {
  if(!res) {
    res = {};
  }
  const lastName = findLast(name.split('.'));
  const isContinue = /^\$\$/.test(lastName);
  if(isContinue) {
    name = name.replace(/\.\$\$/g, '.');
  }
  const continueKeys = [].concat(options.continueKeys || [], isContinue ? [name] : []);
  // const continueKeys = options.continueKeys || []
  const hiddenKeys = options.hiddenKeys || [];
  const showValueOnly = options.showValueOnly || false;
  //TODO 去除前缀
  if(is.array(obj) && !continueKeys.includes(name)) {
    obj.map((item, index) => {
      if(!hiddenKeys.includes(`${name}[${index}]`)) {
        travelObject(item, `${name}[${index}]`, res, options);
      }
    })
  } else if (is.object(obj) && !continueKeys.includes(name)){
    Object.keys(obj).map((key) => {
      if(!hiddenKeys.includes(`${name}.${key}`)) {
        travelObject(obj[key], `${name}.${key}`, res, options);
      }
    })
  } else {
    res[name] = showValueOnly ? obj: {
      type: is.type(obj),
      value: obj,
    };
  }
  return res;
}

export const formatControlType = function(valueType = '', value) {
  const typeToControlMap = {
    'boolean': 'a-switch',
    'string': 'a-input',
    'number': 'a-input-number',
    'array': 'Select',
  }
  // if(valueType === 'string' && value.endsWith('.png')) {
  //   return 'Image'
  // }
  return typeToControlMap[valueType] || 'Input';
}

/**
 * 替换文案的占位符
 * @param {*} data 数据
 * @param {*} text {{uid}}
 */
export const replaceTextByData = (data, text) => {
  if(typeof text !== 'string') {
    return '';
  }
  return text.replace(/\{\{([\w0-9]+)\}\}/g, function(word, key) {
    return data ? data[key] || '' : '';
  });
}

/**
 * 对请求进行缓存，缓存promise仅支持当前会话缓存
 */
export const useCache = (() => {
  let caches = {};
  let cachePromises = {};
  return function(actions, options = {}) {
    return async function(...args) {
      const { cacheTime = 5000, cacheKey } = options || {};
      const requestParams = args[0] || {};
      let res = null,
        cacheId = `${options.cacheId}${cacheKey ? requestParams[cacheKey] || '' : ''}`;
      //如果有缓存，或者该请求还未结束，返回缓存或者缓存的promise，防止同时发送很多相同请求的情况
      if (cacheId && cachePromises[cacheId]) {
        res = caches[cacheId] || (await cachePromises[cacheId]);
      } else {
        //如果promise为函数则执行
        let promise = typeof actions === 'function' ? actions(...args) : actions;
        //缓存promise
        if (cacheId) {
          cachePromises[cacheId] = promise;
        }
        res = await promise;
        //缓存结果
        if (cacheId) {
          caches[cacheId] = res;
        }
        //设置了过期时间
        if (cacheId && cacheTime) {
          setTimeout(() => {
            caches[cacheId] = null;
            cachePromises[cacheId] = null;
          }, cacheTime);
        }
      }
      return cloneDeep(res);
    };
  };
})();
/**
 * 格式化并计算好options
 * @param {*} options 
 * @param {*} value 
 */
export const formatOptions = (options = {}, value = {}) => {
  const newOptions = {};
  const valueKeys = Object.keys(value).map(key => key.replace('value.', ''));
  const values = Object.values(value);
  Object.keys(options).map(key => {
    if(/^\$/.test(key)) {
      newOptions[key.replace(/^\$/, '')] = new Function(...valueKeys, `try {return ${options[key]};} catch(err) {}`).apply(null, values);
    } else {
      newOptions[key] = options[key];
    }
  });
  return newOptions;
}
/**
 * 将a-form-item 转换为AFormItem
 * @param {*} str 
 */
export const strToComponentName = function(str) {
  if(typeof str !== 'string') {
    return ''
  }
  return str.split('-').map(name => upperFirstCase(name)).join('');
}
/**
 * 首字母大写
 * @param {*} str 
 */
export const upperFirstCase = function(str) {
  if(typeof str !== 'string' || str.length === 0) {
    return '';
  }
  return `${str[0].toUpperCase()}${str.slice(1) || ''}`;
}