#!/bin/bash
#mkUser.sh

usr=$1
pwd=$2
rol=$3
org=$4

md5=$(echo "$usr.$pwd" | md5sum)
md5="${md5:0:32}"

stmt="insert into users values('Agro_$rol',0,'$usr','$md5','$rol','$org','ES');"

echo $stmt | sqlite3 ~/RETO/apps/Agro/sqlite/test/usersTest.sqlite
