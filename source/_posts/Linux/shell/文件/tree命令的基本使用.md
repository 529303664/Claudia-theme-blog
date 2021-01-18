---
title: tree命令的基本使用
tags: [Linux, shell, 文件处理]
categories: [Linux]
version: 1
date: 2021-01-18 10:15:44
---
每天学一个 Linux 命令之tree的基本使用
<!-- more -->

## 命令简介

tree 命令的作用是以树形结构显示目录下的内容。

常用的Linux发行版系统中默认没有这个命令，你需要通过安装才可以使用：

``` BASH
#Centos
yum install tree -y
#Ubuntu
sudo apt-get install tree
```

安装完成之后就可以正常使用这个tree命令了。

## 语法格式
``` BASH
tree [选项] [目录]
```

## 选项说明
``` BASH
-a   #显示所有文件
-d   #只显示目录（名称）
-l   #显示链接文件的原始文件
-f   #显示所列出的文件或目录的完整目录路径
-i   #不以阶梯的形式显示文件或目录名称
-q   #将控制字符以?字符代替，显示文件和目录名称
-N   #直接显示文件或目录的名称
-p   #显示每个文件的权限信息
-u   #显示文件所有者或者uid
-g   #显示文件所属组或者gid
-s   #显示每个文件的大小信息
-h   #以可读的方式显示文件的大小信息
-D   #显示最后修改日期
-v   #按字母数字正序显示文件
-r   #按字母数字倒序显示文件
-t   #按最后时间排序显示文件
-C   #在文件和目录列表上加上色彩，便于区分文件类型
-P pattern    #只显示匹配正则表式的文件或目录名称
-I pattern    #与上结果相反
```

## 应用举例

``` BASH
#树形显示当前目录及其子目录下的文件及目录名称
[root@centos7 testdir]# tree
.
├── dir
│   ├── test2.txt~
│   ├── test3.txt
│   └── test3.txt.bak
├── test2.txt
└── test2.txt~
1 directory, 5 files
#只显示目录名称
[root@centos7 testdir]# tree -d
.
└── dir
1 directory
#显示目录及文件的权限信息
[root@centos7 testdir]# tree -p
.
├── [drwxr-xr-x]  dir
│   ├── [-rw-r--r--]  test2.txt~
│   ├── [-rw-r--r--]  test3.txt
│   └── [-rw-r--r--]  test3.txt.bak
├── [-rw-r--r--]  test2.txt
└── [-rw-r--r--]  test2.txt~
1 directory, 5 files
#显示几层信息2代表2层（向下）
[root@centos7 testdir]# tree -L 2
.
├── dir
│   ├── test2.txt~
│   ├── test3.txt
│   └── test3.txt.bak
├── test2.txt
└── test2.txt~
1 directory, 5 files
[root@centos7 testdir]# tree -L 1
.
├── dir
├── test2.txt
└── test2.txt~
1 directory, 2 files

```

-C 显示各种文件类型，以颜色区分

![img](/images/tree命令的基本使用-01.png)

``` BASH
#显示文件和目录的所有者
[root@centos7 testdir]# tree -u
.
├── [root    ]  cp -> /usr/bin/cp
├── [root    ]  dir
│?? ├── [root    ]  test2.txt~
│?? ├── [root    ]  test3.txt
│?? └── [root    ]  test3.txt.bak
├── [root    ]  test2.txt
└── [root    ]  test2.txt~
1 directory, 6 files
#显示文件和目录的所属组
[root@centos7 testdir]# tree -g
.
├── [root    ]  cp -> /usr/bin/cp
├── [root    ]  dir
│?? ├── [root    ]  test2.txt~
│?? ├── [root    ]  test3.txt
│?? └── [root    ]  test3.txt.bak
├── [root    ]  test2.txt
└── [root    ]  test2.txt~
1 directory, 6 files
#不按树形形式显示文件和目录
[root@centos7 testdir]# tree -i
.
cp -> /usr/bin/cp
dir
test2.txt~
test3.txt
test3.txt.bak
test2.txt
test2.txt~
1 directory, 6 files
[root@centos7 testdir]# tree
.
├── cp -> /usr/bin/cp
├── dir
│   ├── test2.txt~
│   ├── test3.txt
│   └── test3.txt.bak
├── test2.txt
└── test2.txt~
1 directory, 6 files
#显示文件和目录的完整路径
[root@centos7 testdir]# pwd
/root/testdir
[root@centos7 testdir]# tree -f
.
├── ./cp -> /usr/bin/cp
├── ./dir
│   ├── ./dir/test2.txt~
│   ├── ./dir/test3.txt
│   └── ./dir/test3.txt.bak
├── ./test2.txt
└── ./test2.txt~
1 directory, 6 files
[root@centos7 ~]# tree -f ./testdir/
./testdir
├── ./testdir/cp -> /usr/bin/cp
├── ./testdir/dir
│   ├── ./testdir/dir/test2.txt~
│   ├── ./testdir/dir/test3.txt
│   └── ./testdir/dir/test3.txt.bak
├── ./testdir/test2.txt
└── ./testdir/test2.txt~
1 directory, 6 files

```
