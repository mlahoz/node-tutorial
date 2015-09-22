var http = require('http'),
    finalhandler = require('finalhandler'),
    serveStatic = require('serve-static');

var serve = serveStatic("./public/");

var server = http.createServer(function(req, res) {
  serve(req, res, finalhandler(req, res));
});

server.listen(8000);
