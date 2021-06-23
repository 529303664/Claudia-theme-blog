#!/bin/bash
export LD_PRELOAD=/usr/local/lib/libtcmalloc.so
ulimit -SHn 51200
/usr/local/nginx/sbin/nginx/nginx -t && /usr/local/nginx/sbin/nginx/nginx -c /usr/local/nginx/conf/nginx.conf
