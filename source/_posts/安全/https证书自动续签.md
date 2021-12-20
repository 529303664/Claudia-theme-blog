---
title: https证书自动续签
tags: [安全, 证书]
categories: [安全]
version: 1
date: 2021-12-20 17:58:58
---

## [安装说明](https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E)

## 续签代码
```BASH
acme.sh --install-cert -d eth2app.com -d test.eth2app.com -d api.eth2app.com -d h5.eth2app.com  -d h5admin.eth2app.com -d rpc.eth2app.com  --key-file       /etc/nginx/ssl/eth2app.com/key.pem  --fullchain-file /etc/nginx/ssl/eth2app.com/cert.pem

acme.sh --issue --dns dns_gd -d eth2app.com -d test.eth2app.com -d api.eth2app.com -d h5.eth2app.com -d h5admin.eth2app.com -d rpc.eth2app.com
```

## [DNS API](https://github.com/acmesh-official/acme.sh/wiki/dnsapi)


<!-- more -->