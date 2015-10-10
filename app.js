var http = require("http"),
    fs = require("fs"),
    querystring = require("querystring");

http.createServer(function(req, res) { var data = "";
    // serve static form
    if (req.method == "GET") {
        getFile(__dirname + "/public/simpleForm.html", "text/html", res); }

    // handle form post
    if (req.method == "POST") {
        req.on("data", function(chunk) {
            // append received data
            data += chunk;
        });
        req.on("end", function() {
            // get key/value pairs from received data
            var params = querystring.parse(data),
            userName = params.firstName + " " + params.lastName,
            html = "<!doctype html>" +
                "<html><head><title>Hello " + userName + "</title></head>" +
                "<body><h1>Hello, " + userName + "!</h1></body></html>";
            res.end(html);
        });
    }
}).listen(8000);

function getFile(localPath, mimeType, res) {
    fs.readFile(localPath, function(err, contents) {
        if (!err) {
            res.writeHead(200, {
                "Content-Type": mimeType,
                "Content-Length": contents.length
            });
            res.end(contents);
        } else {
            res.writeHead(500);
            res.end();
        }
    });
}
