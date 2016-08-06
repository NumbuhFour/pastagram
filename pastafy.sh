#!/bin/bash
meatballify.sh $1
pastafy_style.sh $1

node combine.js $1
