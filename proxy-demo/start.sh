#!/bin/bash

docker run --name="demo-nginx" \
-p 7000:80 \
-d \
saltfactory/nginx
