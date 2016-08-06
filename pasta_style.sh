#!/bin/bash
width=$(node getwidth.js $1)

th ./neural-style/neural_style.lua -style_image ~/Pictures/pasta/384231.jpg -content_image $1 -output_image "style_out-$1" -model_file models/nin_imagenet_conv.caffemodel -proto_file models/train_val.prototxt -gpu -1 -num_iterations 500 -seed 123 -content_weight 7 -style_weight 1000 -optimizer lbfgs -content_layers relu0,relu3,relu7,relu12 -style_layers relu0,relu3,relu7,relu12 -style_scale 0.6 -image_size $width
