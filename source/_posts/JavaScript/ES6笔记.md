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

* 当使用let，const声明语句时，还未执行的时候，变量会存入TDZ(暂时性死区)，引用语句时，会抛出错误。
* 类声明与let声明类似，不能被提升；真正执行声明语句之前，它们会一直存在于临时死区中。

``` JS
console.log(typeof value); // throw ReferenceError: Cannot access 'value' before initialization
let value = 'string';
```

### 更好的Unicode支持

以后做字符处理时，优先选择codePoint相关方法， `String.fromCodePoint` 可以同时处理BMP和非BMP字符，即支持0xFFFF以上的字符解析

``` JS
String.fromCodePoint(97); // a
String.fromCharCode(97); // a
```

### 函数形参的默认值

可以利用以下特性，对入参做些预处理

``` JS
function add(first, second = first) {
  return first + second;
}
```

### 新增方法

比起 `===` 判断两个变量是否一致，Object.is()会更完善，优先使用它

``` JS
console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false

console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true
```

### 自由属性枚举顺序

`Object.getOwnPropertyNames` 返回一个数组，它包含了指定对象所有的可枚举或不可枚举的属性名，而 `Object.keys` 返回一个包含所有给定对象自身可枚举属性名称的数组。

``` JS
var a = {};
Object.defineProperties(a, {
  one: {
    enumerable: true,
    value: 1
  },
  two: {
    enumerable: false,
    value: 2
  },
});
Object.keys(a); // ["one"]
Object.getOwnPropertyNames(a); // ["one", "two"]
```

### Symbol共享

如果想创建一个可共享的Symbol，要使用Symbol.for()方法。它只接受一个参数。

``` JS
let uid = Symbo.for('uid');
let object = {};
object[uid] = '12345';

console.log(object[uid]); // "12345"
console.log(uid); // "Symbol(uid)"
```

> `Symbol.for()` 方法首先在全局Symbol注册表中搜索键为"uid"的Symbol是否存在，如果存在，直接返回已有的Symbol；否则，创建一个新的Symbol，并使用这个键在Symbol全局注册表中注册，随即返回新创建的Symbol。

### Set

* Set不允许相同的值存在两个，所以可以使用Set去重，比如`[...new Set([1, 3, 1])]`; 
* 在Set集合中，不会对所存值进行强制的类型转换，数字5和字符串“5”可以作为两个独立元素存在。
* add, delete, has类似数组的push、splice、includes。
* 在Set存放对象，当对象的引用清除了，也不会释放，调用delete或者clear，还可以使用WeakSet，存放弱引用。

### WeakSet

* WeakSet没有Set诸如add, has, delete, forEach, size等方法和属性，也不可迭代
* 只适合用来跟踪对象引用。

### Map

* 与Object相比，键值支持对象作为属性，"5"、5将作为不同的key，而Object会调用toString将5转化为字符串，两个键值将冲突。
* set, get, delete, has, clear方法，size属性。
* forEach。

### WeakMap

* 类似WeakSet，Key存放对象的弱引用，当该对象的所有强引用都被清除时，WeakMap中对应的弱引用键及其对应的值也会自动被GC。

### 迭代器
* 本质就是调用对象的next方法 每次调用next，返回{ value: xxx, done: false }对象，当done为true表示迭代结束。

### 类

### 数组

* 类数组对象（具有数值型索引和length属性的对象）。
* 定型数组，节省内存，JS数字是以64位浮点格式存储。
* 数组缓冲区 ArrayBuffer，类似C语言的`malloc`分配内存。`DataView`数据视图，用来操作数组缓存区的数据。
* 特定类型视图，Int8Array等。
![img](images/ES6笔记/ES6笔记-01.png)。

### Promise与异步编程

### 代理(Proxy)和反射Reflection

### 模块

* 不管在import语句中把一个模块写了多少次，该模块将只执行一次。