/**
 * 判断是否为合法URL
 * @param {String} value url
 */
export function isValidURL(value) {
  try {
    new URL(value);
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * 用参数生成路径
 * const route = "/app/:page/:id";
generatePath(route, {
  page: "products",
  id: 85,
});
 /app/products/123
 * @param {String} path 
 * @param {Object} obj 
 */
export function generatePath(path, obj) {
    return path.replace(/(:[a-z]+)/g, (v) => obj[v.substr(1)]);
}

/**
 * 从路径获取参数
 * 
 * ①getPathParams("/app/products/123", "/app/:page/:id") => { page: 'products', id: '123' }
 * 
 * ②getPathParams("/items/2/id/8583212", "/items/:category/id/:id", {
  category: v => ['Car', 'Mobile', 'Home'][v],
  id: v => +v
}) => { category: 'Home', id: 8583212 }
 * @param {String} path 路径实例
 * @param {String} pathMap 映射关系
 * @param {Object} serializer 每个参数对应处理方法
 */
export function getPathParams(path, pathMap, serializer) {
  path = path.split("/");
  pathMap = pathMap.split("/");
  return pathMap.reduce((acc, crr, i) => {
    if (crr[0] === ":") {
      const param = crr.substr(1);
      acc[param] = serializer && serializer[param]
        ? serializer[param](path[i])
        : path[i];
    }
    return acc;
  }, {});
};

/**
 * 用查询字符串生成路径
 * 
 * getQueryParams("/user?name=Orkhan&age=30") => { name: 'Orkhan', age: '30' }
 * @param {String} url 
 */
export function getQueryParams(url) {
  return url.match(/([^?=&]+)(=([^&]*))/g).reduce((total, crr) => {
    const [key, value] = crr.split("=");
    total[key] = value;
    return total;
  }, {});
}