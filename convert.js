var gm = require('gm');

var file = process.argv[2];

var newfile = file.split('.').slice(0,-1).join('.') + '.png';

if (!file.toLowerCase().endsWith('png')) {
  gm(file).write(newfile, function(err) {
    if (err) throw err;
    console.log('Image converted.');
  });
}

console.log(newfile);
