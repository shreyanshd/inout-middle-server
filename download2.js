var http = require('http');
var fs = require('fs');

var url = require("url");
var app = {};
function download(uri,cb) {

  var filename = url.parse(uri).pathname.split("/").pop();
  var file = fs.createWriteStream("./public/"+filename);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};
app.download = download;
module.exports = app ;
