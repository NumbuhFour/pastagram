var fs = require('fs');
var filename = process.argv[2];

var meatballFN = 'meatball-' + filename;
var styleFN = 'style_out-' + filename;

var Canvas = require('canvas');
var Image = Canvas.Image;



fs.readFile(__dirname + '/' + meatballFN, function(err, meatball) {
  if(err) throw err;
  var img = new Image;
  img.src = meatball;

  var canvas = new Canvas(img.width, img.height);
  var ctx = canvas.getContext('2d');

  fs.readFile(__dirname + '/' + styleFN, function(err, style) {
    var img_s = new Image;
    img_s.src = style;

    ctx.drawImage(img_s, 0,0);
    ctx.drawImage(img, 0,0);

    var out = fs.createWriteStream(__dirname + '/final-' + filename);
    var stream = canvas.pngStream();

    stream.on('data', function(chunk) { out.write(chunk); });
    stream.on('end', function() { console.log('saved'); });
  });  
});
