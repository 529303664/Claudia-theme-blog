---
title: PWA在likee业务线的实践
tags: [PWA]
categories: [PWA]
version: 1
date: 2021-01-08 17:37:50
---


## 1. 什么是PWA？

PWA（Progressive web apps，渐进式 Web 应用）运用现代的 Web API 以及传统的渐进式增强策略来创建跨平台 Web 应用程序。

<!-- more -->

如何理解渐进式？

*   渐进式构建。构成 PWA 的标准都来自 Web 技术，它们都是浏览器提供的、向下兼容的、没有额外运行时代价的技术。因此可以把任何现有的框架开发的 Web 页面改造成 PWA，不需要完全重构现有代码，可以逐步地迁移和改善。
*   渐进式增强。浏览器厂商会逐步提供对 PWA 相关api的支持，现代浏览器的用户会逐步受益，但不会为使用旧版浏览器的用户破坏任何内容。

## 2. PWA能做什么？

*   安装添加桌面图标
*   提供前端网络代理
*   利用cache api对response进行缓存
*   发送push通知  

    接收服务端推送

## 3. PWA的工作原理

PWA实现上述功能，依赖于service worker提供的能力。

service worker是web worker的一种，是运行在独立线程中的js代码。一个service worker的完整生命周期如下图所示。

![](/images/PWA在likee业务线的实践-01.png)

通常遵循以下基本步骤来使用 service worker：

*   service worker URL 通过 serviceWorkerContainer.register() 来获取和注册。
*   如果注册成功，service worker 就在 ServiceWorkerGlobalScope 环境中运行； 这是一个特殊类型的 worker 上下文运行环境，与主运行线程（执行脚本）相独立，同时也没有访问 DOM 的能力。
*   service worker 现在可以处理事件了。  

    受 service worker 控制的页面打开后会尝试去安装 service worker。最先发送给 service worker 的事件是安装事件。

*   当 oninstall 事件的处理程序执行完毕后，可以认为 service worker 安装完成了。
*   下一步是激活。当 service worker 安装完成后，会接收到一个激活事件(activate event)。onactivate 主要用途是清理先前版本的service worker 脚本中使用的资源。
*   service worker 现在可以控制页面了，但仅是在 register() 成功后的打开的页面。

示例代码如下：

``` JS
navigator.serviceWorker.register(opts.url).then(function(registration) {
  console.log("Service worker successfully registered.");
})
```

## 4. 处理业务需要封装的基本方法

为了处理业务，我们对service worker相关的基本方法进行了封装

主线程js封装如下：

``` JS
/**
 * service worker sdk
 * 
 * @param {string} opts.url [required] sw文件地址
 * @param {function} opts.onReady [optional] sw注册成功
 * @param {function} opts.onBeforeInstallPrompt [optional] 未安装pwa事件触发
 * @param {function} opts.onClickInstallPrompt [optional] 点击安装确认弹窗
 * @param {function} opts.onInstalled [optional] pwa安装成功时触发
 * @param {function} opts.onNotificationPermission [optional] 点击通知授权确认弹窗
 * 
 */
export function SWSdk(opts) {
  /**
   * 初始化sw
   */
  /**
   * sw注册成功
   */
  /**
   * 未安装pwa事件触发
   */
  /**
   * pwa安装成功时触发
   */
  /**
   * 弹出安装确认弹窗
   */
  /**
   * 监听sw事件
   */
  /**
   * 触发sw事件
   */
  /**
   * 弹出通知授权确认弹窗
   */
  /**
   * 发送一条通知
   */
  /**
   * 缓存资源
   */
  /**
   * 删除缓存资源
   */
}
```

sw线程js封装如下：

``` JS
/**
 * SW
 * 
 * @param {string} opts. CACHE_NAME [optional] 缓存命名空间，建议每个应用独立命名
 * @param {number} opts.tickTime [optional] 每个tick的时间间隔，单位ms，默认1000
 * @param {function} opts.onTick [optional] 每个时间间隔调用一次
 * @param {function} opts.onProxy [optional] 代理网络请求
 * @param {function} opts.onInstall [optional] 安装事件的回调
 * @param {function} opts.onActivate [optional] 激活事件的回调
 * @param {function} opts.onPush [optional] 收到服务端事件的回调
 * @param {function} opts.notificationOnClick [optional] 点击push通知的回调
 */
var SW = function(opts) {
  /**
   * 初始化sw
   */
  /**
   * 监听窗口事件
   */
  /**
   * 触发窗口事件
   */
  /**
   * 设置cache
   */
  /**
   * 获取cache
   */
  /**
   * 发送一条通知
   */
};
```

对service worker api的封装，使我们可以更加集中精力处理业务。

封装的基本方法有：

> a. 线程间通讯。主线程和service worker线程之间需要频繁的通信，因此需要封装比较友好的通信方法

主线程：

``` JS
/**
 * 监听sw事件
 * 
 * @param {string} eventName [required] 事件名称
 * @param {function} handler [required] 处理函数
 */
this.on = function(eventName, handler) {
  this.eventListener.push({

    eventName: eventName,
    handler: handler

  })
};
/**
 * 触发sw事件
 * 
 * @param {string} eventName [required] 事件名称
 * @param {any} payload [optional] 传递的数据
 */
this.emit = function(eventName, payload) {
  const data = {

    eventName: eventName,
    payload: payload

  };
  try {

    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(data);
    } else {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        navigator.serviceWorker.controller.postMessage(data);
      });
    }

  } catch (err) {

    console.error(err);

  }
}
```

service worker线程：

``` JS
/**
 * 监听窗口事件
 * 
 * @param {string} eventName [required] 事件名称
 * @param {function} handler [required] 处理函数
 */
this.on = function(eventName, handler) {
  this.eventListener.push({

    eventName: eventName,
    handler: handler

  })
};
/**
 * 触发窗口事件
 * 
 * @param {string} eventName [required] 事件名称
 * @param {any} payload [optional] 传递的数据
 */
this.emit = function(eventName, payload) {
  clients.matchAll({

    type: 'window',
    includeUncontrolled: true

  }).then(function(matchClient) {

    matchClient.forEach(function(client) {
      client.postMessage({
        eventName: eventName,
        payload: payload
      });
    })

  });
};
```

> b. 本地存储。在service worker 线程中，我们无法使用cookie，localStorage和sessionStorage，我们只能使用cache api或者indexDB作为存储key-value数据的载体。

``` JS
/**
 * 设置cache
 * 
 * @param {string} key cache的key
 * @param {any} value cache的值
 */
this.setCache = function(key, value) {
  try {

    return caches.open(this.CACHE_NAME).then(function(cache) {
      return cache.put(key, new Response(value));
    })

  } catch (err) {

    const that = this;
    return new Promise(function(resolve) {
      if (!that.cacheStorage[that.CACHE_NAME]) {
        that.cacheStorage[that.CACHE_NAME] = {};
      }
      that.cacheStorage[that.CACHE_NAME][key] = value;
      resolve();
    })

  }
};
/**
 * 获取cache
 * 
 * @param {string} key cache的key
 */
this.getCache = function(key) {
  try {

    return caches.open(this.CACHE_NAME).then(function(cache) {
      return cache.match(key);
    }).then(function(response) {
      return response ? response.text() : '';
    })

  } catch (err) {

    const that = this;
    return new Promise(function(resolve) {
      resolve(new String(that.cacheStorage[that.CACHE_NAME][key]));
    })

  }
};
```

cache api无法直接保存key-value键值对数据，只能保存url-response对数据，我们这里使用了一些小技巧，使它可以存储key-value型数据

> c. 通知

主线程申请授权

``` JS
/**
 * 弹出通知授权确认弹窗
 */
this.requestNotificationPermission = function() {
  Notification.requestPermission().then((result) => {

    that.onNotificationPermission.bind(that)(result);

  });
};
```

service worker线程发送通知

``` JS
/**
 * 发送一条通知
 * 
 * @param {object} params [required]
 * @param {string} params.title [required] 标题
 * @param {string} params.desc [optional] 描述
 * @param {string} params.icon [optional] 图标
 * @param {any} params.data [optional] 传递参数
 * @param {string} params.url [optional] 点击跳转地址
 */
this.showNotification = function(params) {
  try {

    self.registration.showNotification(params.title, {
      body: params.desc,
      icon: params.icon,
      image: params.image,
      data: Object.assign({
        url: params.url
      }, params.data)
    })

  } catch (err) {

    console.log(err);

  }
};
```

## 5\. 业务需求及对策

此小节内容太多，不详细展开，有兴趣可以私聊

> a. 安装桌面快捷方式

*   未安装事件
*   弹出询问安装弹窗api

> b. 本地推送通知

*   询问授权通知api
*   发送通知

> c. sw内埋点

*   Fetch api
*   请求数据构造

> d. 拉活桌面pwa

*   需要安装google play服务
*   需要由不同域的页面发起重定向跳转
*   与pwa同域的链接均可拉活pwa，且pwa展示跳转链接，而非start_url中配置的链接
*   中转页策略

> e. 视频预加载

*   使用cache api

> f. 识别用户访问的是web页面还是桌面pwa

*   桌面入口拉活
*   链接拉活

## 6\. 遇到的问题

> a. 兼容问题

pwa的兼容性是比较差的，几乎每个api都有兼容问题，需要对不同的设备做适配。这些兼容问题很多是查看线上统计数据后才发现的

> b. 数据统计

为了统计pwa转化效果，我们需要识别用户访问的是web页面还是桌面的pwa，然而，我们只能统计到桌面图标打开的用户和链接拉活的pwa用户，对于push拉活，第三方app拉活的场景，我们是无法识别的。
