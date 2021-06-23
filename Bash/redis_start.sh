#!/bin/bash
for port in `seq -f '%g' 6001 6001`;do
  echo "start redis $port"
  /bin/bash -c "/usr/local/redis/bin/redis-server /usr/local/redis/etc/master$port.conf"
done
