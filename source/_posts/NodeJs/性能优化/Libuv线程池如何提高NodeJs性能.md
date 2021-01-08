---
title: Libuv线程池如何提高nodejs性能
tags: [nodejs]
categories: [nodejs]
version: 1
date: 2021-01-08 17:35:42
---
如何提高NodeJS性能？下面我们来介绍一种方式，一起看看吧
<!-- more -->

### [原文链接](https://hackernoon.com/how-libuv-thread-pool-can-boost-your-node-js-performance-bel3tyf)

### Libuv线程池
Libuv启动一个包含4个线程的线程池，用于将同步操作卸载到该线程池。为此，Libuv确保同步任务不会不必要地阻止我们的应用程序。

在这里，我们将利用设置来更好地适应我们的计算机或将应用程序部署到的虚拟机的规格。这是因为我们被允许将4个线程的默认值更改为最多1024个线程。我们通过设置UV_THREADPOOL_SIZE Node变量来实现。

物理与逻辑CPU内核

为了更好地了解将UV_THREADPOOL_SIZE设置为什么，我们首先需要了解我们的计算机正在运行多少个逻辑核心。如果以我的MacBook Pro为例，它运行的是6个物理CPU内核（英特尔）。

但是，这些内核具有超线程，这意味着每个内核可以同时运行2个操作。因此，我们将具有超线程的1个物理核心视为2个逻辑核心。就我而言，我的MacBook Pro运行12个逻辑核心。

### 如何提高Node JS性能

建议将 `UV_THREADPOOL_SIZE` 设置为计算机正在运行的逻辑核心数。就我而言，我将线程池大小设置为12。

将大小设置为除硬件正在运行的逻辑内核之外的任何值都没有意义，实际上可能会导致性能降低。

### 如何检查逻辑核心

部署时，最后要做的是手动设置UV_THREADPOOL_SIZE，因为您的应用程序可能在具有不同机器规格的多个环境中运行。因此，我们需要一种在相关环境中启动应用程序后动态设置线程池大小的方法。

好消息是，这很简单，但必须谨慎对待。为此，请将以下代码添加到Node应用程序的根JS文件的顶部：

``` JavaScript
const OS = require('os')
process.env.UV_THREADPOOL_SIZE = OS.cpus().length
```

该OS模块是原产于节点JS。它具有一个函数cpus（），该函数返回计算机正在运行的逻辑内核的总数。很好的是，如果您的CPU内核没有超线程，则此函数将只返回物理cpu内核的数量，这是完美的。
