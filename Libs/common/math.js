/**
 * 生成一个带有随机数的列表
 * @param {Number} length 数组长度，默认为1
 * @param {Number} mul 默认为1
 */
export function randomNumList(length=1, mul=1, precision=0) {
  // [ 0.6163093133259432, 0.8877401276499153, 0.4094354756035987, ...] - 1000 items
  return Array.from({ length }, v => Number(Number(mul * Math.random()).toFixed(precision)));
}

/**
 * 判断奇数或偶数
 * @param {Number} value
 * @returns "odd" | "even"
 */
export function isOdd(value) {
  return value & 1 === 1 ? 'odd' : 'even';
}