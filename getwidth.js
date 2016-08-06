var fs = require('fs');
var filename = process.argv[2];

var Canvas = require('canvas');
var Image = Canvas.Image;



var file = fs.readFileSync(__dirname + '/' + filename);
var img = new Image;
img.src = file;
console.log(Math.max(img.width, img.height));
