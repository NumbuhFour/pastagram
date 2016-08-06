#!/bin/bash
file=$(node convert.js $1); 

echo "Converting done"
./meatballify.sh $file;
echo "Meatballing done"
./pasta_style.sh $file $2;
echo "Styling done"

node combine.js $file;

echo "File complete $file";
