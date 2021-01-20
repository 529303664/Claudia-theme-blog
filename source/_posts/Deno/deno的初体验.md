---
title: deno的初体验
tags: [deno]
categories: [deno]
version: 1
date: 2021-01-19 18:40:52
---
这是一篇关于deno初体验文章
<!-- more -->

## [Deno](https://deno.land/)

A `secure` runtime for JavaScript and TypeScript。由Ryan Dahl（Node.js 的创始人之一）在2017年创建，Rust 语言开发。 `deno` 音译帝诺，恐龙(dinosaur)的简称，deno 这个名字就是来自 Node 的字母重新组合（Node = no + de），表示"拆除 Node.js"（de = destroy, no = Node.js）。

## 创建原由

* Node.js Callback hell。
* 原生支持CommonJs，对ES模块不兼容。
* npm(你怕吗)模块管理工具，npm_modules 极其庞杂，还有Dependency Hell，版本重复问题等问题，极难管理。详情可查看[node_modules 困境](https://juejin.cn/post/6914508615969669127)
* 功能不完整，要学习很多外部工具，诸如webpack，babel，typescript、eslint、prettier......

> *“由于上面这些原因，Ryan Dahl 决定放弃 Node.js，从头写一个替代品，彻底解决这些问题。deno 这个名字就是来自 Node 的字母重新组合（Node = no + de），表示"拆除 Node.js"（de = destroy, no = Node.js）。
跟 Node.js 一样，Deno 也是一个服务器运行时，但是支持多种语言，可以直接运行 JavaScript、TypeScript 和 WebAssembly 程序。
它内置了 V8 引擎，用来解释 JavaScript。同时，也内置了 tsc 引擎，解释 TypeScript。它使用 Rust 语言开发，由于 Rust 原生支持 WebAssembly，所以它也能直接运行 WebAssembly。它的异步操作不使用 libuv 这个库，而是使用 Rust 语言的 Tokio 库，来实现事件循环（event loop）。”*--- 出自阮一峰大神《[Deno 运行时入门教程：Node.js 的替代品](https://www.ruanyifeng.com/blog/2020/01/deno-intro.html)》

**闲言少叙，书归正传，让我们一起来看看Deno的特性吧。**

## Feature

* 服务器运行时，支持多种语言，可直接运行 `JavaScript`、`TypeScript` 和 `WebAssembly` 程序。
* 具有安全控制，默认情况下脚本不具有读写权限。如果脚本未授权，就读写文件系统或网络，会报错。
* 只有一个可执行文件，所有操作都通过这个文件完成。它支持跨平台（Mac、Linux、Windows）。
* 异步操作 一律返回 Promise。
* Deno 支持 Web API，尽量跟浏览器保持一致。`window`、`fetch`、`webCrypto`、`worker`, 也支持 `onload`、`onunload`、`addEventListener` 等事件操作函数。
* 所有模块通过 URL 加载，比如`import { bar } from "https://foo.com/bar.ts"`（绝对 URL）或`import { bar } from './foo/bar.ts'`（相对 URL）。本地缓存，有个Cache总目录
* 原生支持TypeScript。
* 内置各种功能，无需外部工具。
* 打包、格式清理、测试、安装、文档生成、linting、脚本编译成可执行文件等一条龙服务。

## 优势

* 高效且安全
* 单文件，兼容浏览器标准，体积小。
* 替代脚本

## 不足

* 缺少集大成框架，满足不了企业级应用开发。
* 具有安全控制，显示打开权限方可使用。
* 社区还不完善。

## Installation

Shell (Mac, Linux):

``` BASH
curl -fsSL https://deno.land/x/install/install.sh | sh
```

PowerShell (Windows):

``` BASH
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

### Getting Started

Try running a simple program:

``` BASH
deno run https://deno.land/std/examples/welcome.ts
```

Or a more complex one:

``` JS
import {
  serve
} from "https://deno.land/std@0.83.0/http/server.ts";
const s = serve({
  port: 8000
});
console.log("http://localhost:8000/");
for await (const req of s) {
  req.respond({
    body: "Hello World\n"
  });
}
```

## 缓存目录

以Mac为例，举个🌰 

``` BASH
 $HOME/Library/Caches/Deno
#  远程库下载地址
deno run https://deno.land/std@0.83.0/examples/welcome.ts
# DIRECTORIES
gen/: 缓存编译为JavaScript的文件
deps/: 缓存导入的远程url的文件
  |__ http/: http方式导入的文件
  |__ https/: https方式导入的文件

# FILES
deno_history.txt: Deno REPL历史记录缓存
```

### gen/

`$DENO_DIR/gen/` 被用来存放 JavaScript 文件，这些文件是从 TypeScript 源码编译来的。这样的编译是必要的，因为 V8 不识别 JS 子集之外的 TypeScript 语法。

gen/目录下的每一个 JS 文件的文件名是他的 TypeScript 源码的 hash 值。同时 JS 文件也对应一个 .map 为后缀的 source map 文件。

缓存存在的原因是为了避免在用户没有修改代码的情况下，每次运行时不断的重新编译文件。比如我们有一个 hello-world.ts 文件，他只是包含了代码 console.log("Hello world")。在第一次运行时，我们会看到编译信息：

``` BASH
$ deno hello-world.ts
Compiling /Users/kevinqian/my-folder/hello-world.ts
Hello world
```

但是在没有修改文件内容的情况下，当你重新运行代码：

``` BASH
$ deno hello-world.ts
Hello world
```

不会再有编译信息的提示。这是因为在这一次运行中，Deno 直接使用了 gen/ 中缓存的版本，而不用再次编译。

缓存加载和保存的代码，可以从文件 src/deno_dir.rs 中的 DenoDir::load_cache 和 DenoDir::code_cache 中找到。

如果想要强制 Deno 重新编译你的代码而不是使用缓存的版本，你需要使用 `--recompile` 标志。

### deps/

`$DENO_DIR/deps` 被用来保存远端 url import 获得的文件。根据 url 的模式，他包含了子目录（现在只有http和https），并且保存文件的位置由 URL path 决定。比如，对于下面的的 import（请注意，Deno 要求用户显式地指定扩展名）。

``` JS
import {
  serve
} from "https://deno.land/x/std/net/http.ts";
```

下载的http.ts文件将会被存储在：

``` BASH
$DENO_DIR/deps/https/deno.land/x/std/net/http.ts
```

需要注意，除非用户用 `--reload` 标志运行代码，否则我们的http.ts文件在接下来的运行中不会被重新下载。

当前（警告：将来可能改变），Deno 会关注从远端下载的文件的内容的 MIME 类型。在文件缺少扩展名或扩展名与内容类型不匹配的情况下，Deno 将创建一个以 .mime 结尾的额外文件，来存储 HTTP 响应头提供的 mime 类型。如果我们下载的文件名是 a.ts，然而响应头里面是 Content-Type: text/javascript，一个包含text/javascript内容的a.ts.mime文件将会在他旁边被创建。由于.mime文件的存在，a.ts 后面将会被当做一个 JavaScript 文件被 import。
