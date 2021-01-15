const toString = Object.prototype.toString;
/**
 * if val is a boolean
 * @param {*} val 
 * @return { Boolean }
 */
export const bool = function(val) {
  return toString.call(val) === '[object Boolean]'
}
/**
 * if val is a object
 * @param {} val 
 */
export const object = function(val) {
  return toString.call(val) === '[object Object]';
}

export const array = function(val) {
  return toString.call(val) === '[object Array]';
}
export const string = function(val) {
  return toString.call(val) === '[object String]';
}
export const type = function(val) {
  const res = toString.call(val)
  return res.split(' ')[1].replace(']', '').toLowerCase();
}

export const func = function(val) {
  return toString.call(val) === '[object Function]';
}