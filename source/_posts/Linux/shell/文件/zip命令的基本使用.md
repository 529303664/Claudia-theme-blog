---
title: zip命令的基本使用
tags: [Linux, shell, 文件处理]
categories: [Linux]
version: 1
date: 2021-02-22 10:24:04
---
这是一篇关于zip命令的简单使用
<!-- more -->

## 命令简介

zip 命令可以用来压缩、打包文件。

``` BASH
#Debian/Ubuntu安装
apt-get install zip
#CentOS安装
[root@centos7 testdir]# zip
-bash: zip: command not found
[root@centos7 testdir]# yum install zip -y
```

zip 命令也可以用来解压缩文件，zip也是一个常用的压缩、解压应用程序，文件经它压缩后会产生一个新以.zip为扩展名的压缩包文件。

## 语法格式

``` BASH
zip [ OPTIONS ] [ NAME ..]
```

## 选项说明

``` BASH
-A  #调整可执行的自动解压缩文件
-b<工作目录>  #指定压缩文件的存放目录
-c  #给每个被压缩的文件加上注释信息
-d  #从压缩文件内删除指定的文件，也可以使用--delete参数
-D  #压缩文件内不建立目录名称
-f  #更新既有文件，将其它文件一并加入到压缩文件中
-F  #修复已损坏的压缩文件
-g  #将指定文件压缩至已存在的压缩文件中，不建立新文件
-h  #打印帮助信息
-i<范本样式>  #只压缩匹配指定条件的文件
-m  #将指定文件压缩打包后直接删除原始文件
-o  #将压缩文件的属性信息更改成与压缩文件中的最新文件的属性一致
-q  #安静模式
-r  #递归处理
-t<日期时间>  #把压缩文件的日期设成指定的日期
-T  #检查备份文件内的每个文件是否正确无误
-u  #更新较新的文件到压缩文件内
-v  #打印命令执行过程信息或版本信息
-x<范本样式>  #压缩时排除符合条件的文件
-z  #给压缩文件加上注释信息
-<压缩效率>  #指定压缩效率（1~9数字）
```

## 应用举例
在当前目录下创建压缩文件（自动创建以.zip的文件）

``` BASH
[root@centos7 testdir]# zip mingongge *
  adding: cest.txt.gz (stored 0%)
  adding: cuttest.txt.gz (stored 0%)
  adding: dir/ (stored 0%)
  adding: file (stored 0%)
  adding: mingongge1.txt.gz (stored 0%)
  adding: mingongge2.txt.gz (stored 0%)
  adding: mingongge.txt.md5.gz (stored 0%)
  adding: sort.cut.txt.gz (stored 0%)
```

分割一个大文件

``` BASH
[root@centos7 ~]# ls -lh
total 22M
-rw-------.  1 root root 1.3K Aug 20 10:39 anaconda-ks.cfg
-rw-r--r--   1 root root  140 Jan 16 11:36 dos_test.txt
drwxr-xr-x   3 root root   39 Aug 30 03:48 goinception
-rw-r--r--   1 root root  13M Aug 30 03:42 goInception-linux-amd64-v1.2.3.tar.gz
drwxr-sr-x  11 root   40 4.0K Dec 24 22:35 httpd-2.4.46
-rw-r--r--   1 root root 9.0M Aug  5 07:32 httpd-2.4.46.tar.gz
-rw-r--r--   1 root root    0 Jan 16 11:32 mingongge.file
drwxr-xr-x   3 root root  192 Jan 16 16:19 testdir
-rw-r--r--   1 root root  140 Jan 16 11:32 test.txt
[root@centos7 ~]# zip -s 4M -r mingongge.zip httpd-2.4.46.tar.gz
  adding: httpd-2.4.46.tar.gz (deflated 0%)
[root@centos7 ~]# ls -lh
total 31M
-rw-------.  1 root root 1.3K Aug 20 10:39 anaconda-ks.cfg
-rw-r--r--   1 root root  140 Jan 16 11:36 dos_test.txt
drwxr-xr-x   3 root root   39 Aug 30 03:48 goinception
-rw-r--r--   1 root root  13M Aug 30 03:42 goInception-linux-amd64-v1.2.3.tar.gz
drwxr-sr-x  11 root   40 4.0K Dec 24 22:35 httpd-2.4.46
-rw-r--r--   1 root root 9.0M Aug  5 07:32 httpd-2.4.46.tar.gz
-rw-r--r--   1 root root    0 Jan 16 11:32 mingongge.file
-rw-r--r--   1 root root 4.0M Jan 16 16:24 mingongge.z01
-rw-r--r--   1 root root 4.0M Jan 16 16:24 mingongge.z02
-rw-r--r--   1 root root 943K Jan 16 16:24 mingongge.zip
drwxr-xr-x   3 root root  192 Jan 16 16:19 testdir
#从结果可以看出会拆分成三个文件即：4M大小的mingongge.z01、4M大小的mingongge.z02和一个943k的mingongge.zip文件。
```
