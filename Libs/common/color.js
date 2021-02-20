
/**
 * RGB→转换为十六进制
 * rgb2hex([76, 11, 181]) => #4c0bb5
 * @param {[Number, Number, Number]} param0 带有rgb的数组
 */
export function rgb2hex([r, g, b]) {
  return `#${(1 << 24) + (r << 16) + (g << 8) + b}`.toString(16).substr(1);
}

/**
 * 转换十六进制→RGB
 * hex2rgb("#4c0bb5") => [76, 11, 181]
 * @param {String} hex 
 */
export function hex2rgb(hex) {
  return [1, 3, 5].map((h) => parseInt(hex.substring(h, h + 2), 16));
}