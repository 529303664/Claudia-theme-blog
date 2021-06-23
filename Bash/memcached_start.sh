#!/bin/bash
/usr/local/memcached/bin/memcached -d -m 1024 -c 4096 -p 11211 -u www -l 127.0.0.1 -t 10
