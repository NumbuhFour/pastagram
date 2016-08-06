
// Take first from queue
// Put into processing as processing.jpg
// Send through meatball filter. It creates meatball.jpg
// Send through pasta filter. It creates style.jpg
// When both complete, combine into one image complete.jpg
// Delete processing and move to /complete

var fs = require('fs');
var exec = require('child_process').exec;

module.exports = function() {

  var filename;

  var moveQueue = function() {

    var list = fs.readdirSync('./queue');

    if (list.length <= 0) {
      console.log('Queue empty');
      return;
    }

    filename = list[0].split('/');
    filename = filename[filename.length-1];

    var file = fs.createReadStream(list[0]);
    var dest = fs.createWriteStream('./processing/' + filename);

    file.pipe(dest);
    dest.on('end', function() { console.log('Now processing ' + filename); } );
    dest.on('error', function(err) { console.log('Error copying ' + err); } );
  };


  var styleFile, overFile;

  // Called when processes complete
  var verifyComplete = function() {
    console.log("Verifying");
  };

  var execute  = function() {exec(command, function(err, stdout, stderr) { callback(stdout); })};

  execute('./test.sh ./processing/' + filename, verifyComplete);
};
