var http = require("http"),
    querystring = require("querystring");

http.createServer(function(req, res) {
    // parse everything after the "?" into key/value pairs
    var qs = querystring.parse(req.url.split("?")[1]),
        // property names are the same as in the querystring
        userName = qs.firstName + " " + qs.lastName,
        html = "<!doctype html>" +
            "<html><head><title>Hello " + userName + "</title></head>" +
            "<body><h1>Hello, " + userName + "!</h1></body></html>";

    res.end(html);
}).listen(8000);
