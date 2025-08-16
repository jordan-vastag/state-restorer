#!/bin/bash

trap exit TERM
while :
do 
    certbot renew
    sleep 7d & wait $${!}
done 