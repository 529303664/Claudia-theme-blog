---
title: 在nest中使用typeorm-model-generator自动生成实体
tags: [MySQL, nestjs]
categories: [MySQL]
version: 1
date: 2021-04-21 12:35:23
---
总结一下nestjs框架使用typeorm自动生成实体类的方法。可以节省一些开发时间
<!-- more -->
1. `npm i -g typeorm-model-generator` 或者 `yarn global add typeorm-model-generator`
2.  修改项目中的 `package.json` 文件  
``` json 
"scripts": {
  "db": "rimraf ./src/modules/entities & npx typeorm-model-generator -h 121.36.70.68 -d chat -p 3306 -u root -x 123456 -e mysql -o ./src/modules/entities --noConfig true --ce pascal --cp camel"
}
```

   * `rm -rf entities`表示先删除文件夹`entities（window下使用 rimraf entities ）`
   * `npx typeorm-model-generator`如果全局安装了就不需要加npx没有全局安装就加上去
   * `-h localhost -d 数据库名字 -p 端口 -u 用户名 -x 密码 -e 数据库类型`
   * `-o entities`表示输出到指定的文件夹
   * `--noConfig true`表示不生成`ormconfig.json`和`tsconfig.json`文件
   * `--ce pascal`表示将类名转换首字母是大写的驼峰命名
   * `--cp camel`表示将数据库中的字段比如create_at转换为createAt
   * `-a`表示会继承一个`BaseEntity`的类,根据自己需求加
3.  运行代码 `npm run db` 或 `yarn db`
