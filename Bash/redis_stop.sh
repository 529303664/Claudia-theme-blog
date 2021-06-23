#!/bin/bash
for port in `seq -f '%g' 6001 6001`;do
  echo "stop redis $port"
  /usr/local/redis/bin/redis-cli -h 127.0.0.1 -p $port -a 4399data#redis save && \
  /usr/local/redis/bin/redis-cli -h 127.0.0.1 -p $port -a 4399data#redis shutdown
  sleep 2s
done
