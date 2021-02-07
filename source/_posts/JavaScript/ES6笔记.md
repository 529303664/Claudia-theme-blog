---
title: ES6笔记
tags: [ES6]
categories: [JavaScript]
version: 1
date: 2021-02-07 11:15:02
---
总结一些比较需要注意的ES6语法。
<!-- more -->
## 基础

### TDZ(暂时性死区)
当使用let，const声明语句时，还未执行的时候，变量会存入TDZ(暂时性死区)，引用语句时，会抛出错误。
``` JS
console.log(typeof value); // throw ReferenceError: Cannot access 'value' before initialization
let value = 'string';
```

### 更好的Unicode支持
以后做字符处理时，优先选择codePoint相关方法，`String.fromCodePoint`可以同时处理BMP和非BMP字符，即支持0xFFFF以上的字符解析
``` JS
String.fromCodePoint(97); // a
String.fromCharCode(97); // a
```

### 函数形参的默认值
可以利用以下特性，对入参做些预处理
``` JS
function add(first, second=first) {
  return first + second;
}
```

### 新增方法
比起`===`判断两个变量是否一致，Object.is()会更完善，优先使用它
``` JS
console.log(+0===-0); // true
console.log(Object.is(+0, -0)); // false

console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true
```

### 自由属性枚举顺序
`Object.getOwnPropertyNames`返回一个数组，它包含了指定对象所有的可枚举或不可枚举的属性名，而`Object.keys`返回一个包含所有给定对象自身可枚举属性名称的数组。
``` JS
var a = {};
Object.defineProperties(a, {
    one: {enumerable: true, value: 1},
    two: {enumerable: false, value: 2},
});
Object.keys(a); // ["one"]
Object.getOwnPropertyNames(a); // ["one", "two"]
```
