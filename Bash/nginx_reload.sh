#!/bin/bash
/usr/local/nginx/sbin/nginx/nginx -t && /usr/local/nginx/sbin/nginx/nginx -s reload
# kill -HUP `cat /usr/local/nginx/logs/nginx.pid`
