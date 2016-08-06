var fs = require('fs');
var express = require('express');
var app = express();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var process = require('./process');

var index = fs.readFileSync('views/index.html');

app.get('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(index);
});


app.post('/queue', multipartMiddleware, function(req, res) {
  fs.readFile(req.files.image.path, function(err, data) {
    var imageName = req.files.image.name;

    if(!imageName) {
      console.log("There was an error.");
      res.redirect('/');
      res.end();
    }
    else {
      var newPath = __dirname + '/queue/' + imageName;

      fs.writeFile(newPath, data, function(err) {
        res.redirect('/queue/' + imageName);
      });
    }
  });
});

// Route for showing files
app.get('/uploads/:file', function(req, res) {
  file = req.params.file;
  var img = fs.readFileSync(__dirname + '/uploads/' + file);
  res.writeHead(200, {'Content-Type': 'image/jpg'});
  res.end(img, 'binary');
});

app.listen(8080);
