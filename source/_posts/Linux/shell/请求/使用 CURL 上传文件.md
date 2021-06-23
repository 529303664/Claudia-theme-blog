---
title: 使用 CURL 上传文件
tags: [Linux, shell, curl, 上传文件]
categories: [Linux]
version: 1
date: 2021-06-23 16:30:40
---
CURL 是一个强大的向服务器发送请求的工具， 尤其是在测试 API 的时候。
<!-- more -->

很多人像寻常表单一样使用了 `-X POST` 方式来使用 CURL 去上传文件，但实际上这是错误的。
正确的方式是使用 **-F (--form)** 来上传文件，这样才会给请求添加 enctype=`"multipart/form-data"` 参数。

```BASH
curl -F 'data=@path/to/local/file’ UPLOAD_ADDRES
```

例如， 如果我想向服务器 `http://localhost/upload` 上传位于`/home/petehouston/hello.txt`的文件，并将上传的文件的参数命名为 `img_avatar`, 我可以这样发送请求,
```BASH
curl -F 'img_avatar=@/home/petehouston/hello.txt' http://localhost/upload
```

## 上传多个文件
想要同时上传多个文件的话，只需要添加多个 -F 选项就可以了。

```BASH
curl -F 'fileX=@/path/to/fileX' -F 'fileY=@/path/to/fileY' ... http://localhost/upload
```

## 上传文件数组
```BASH
curl -F 'files[]=@/path/to/fileX' -F 'files[]=@/path/to/fileY' ... http://localhost/upload
```