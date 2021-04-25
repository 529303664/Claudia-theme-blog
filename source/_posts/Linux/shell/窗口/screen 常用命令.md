---
title: screen 常用命令
tags: [Linux, shell]
categories: [Linux]
version: 1
date: 2021-04-25 21:49:24
---
screen 常用命令介绍
<!-- more -->
## 常用命令
``` BASH
screen -ls              # 查看所有screen
screen -S <screen-name> # 创建screen，并命名
ctr + A, D              # 快捷键，退出当前screen
screen -r <screen-name> # 进入screen
screen -X quit          # 删除screen，但没有指定会话
screen -X -S [session you want to kill] quit #删除screen，指定会话
screen -wipe            # 清除dead screens
```
