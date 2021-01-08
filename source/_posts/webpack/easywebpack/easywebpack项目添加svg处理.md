---
title: easywebpack项目添加svg处理
tags: [svg, webpack, 基础构建]
categories: [easywebpack]
version: 1
date: 2021-01-08 17:43:20
---

比如查看webpack最终的loader： `easywebpack print test -n module.rules`

<!-- more -->

easywebpack配置svg-sprite-loader的配置：

### 配置
>去除默认svg处理，并添加svg-sprite-loader配置
``` JS
loaders: {
  urlimage: {
    test: /\.(png|jpe?g|gif)(\?.*)?$/, // 默认的url-loader在将svg也处理了，需要去掉
  },
  svg: {
    test: /\.svg$/,
    loader: 'svg-sprite-loader',
    options: {
      symbolId: 'icon-[name]',
    },
    include: resolve('app/web/asset/svg'),
  },
}
```

网上关于[svg-sprite-loader](https://juejin.cn/post/6854573215646875655)的介绍

