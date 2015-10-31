

var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    events = require("events");

var test = {};

test.download = function(file,cb){



var downloadfile = file;

var host = url.parse(downloadfile).hostname
var filename = url.parse(downloadfile).pathname.split("/").pop()

var theurl = http.createClient(80, host);
var requestUrl = downloadfile;
console.log("Downloading file: " + filename);
console.log("Before download request");
var request = theurl.request('GET', requestUrl, {"host": host});
request.end();

var dlprogress = 0;

var interval = setInterval(function () {
  console.log("Download progress: " + dlprogress + " bytes");
}, 1000);



request.addListener('response', function (response) {


        var downloadfile = fs.createWriteStream("./public/videos/"+filename, {'flags': 'a'});
        console.log("File size " + filename + ": " + response.headers['content-length'] + " bytes.");
        response.addListener('data', function (chunk) {
            dlprogress += chunk.length;
            downloadfile.write(chunk, encoding='binary');
        });
        response.addListener("end", function() {
            downloadfile.end();
          clearInterval(interval);
          cb(filename);


            sys.puts("Finished downloading " + filename);
        });

    });
}


module.exports = test;
