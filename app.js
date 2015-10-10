var connect = require("connect"),
    bodyParser = require("body-parser"),
    serveStatic = require("serve-static"),
    app = connect();

app.use(serveStatic("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res) {
    var userName = req.body.firstName + " " + req.body.lastName,
    html = "<!doctype html>" +
        "<html><head><title>Hello " + userName + "</title></head>" +
        "<body><h1>Hello, " + userName + "!</h1></body></html>";
    res.end(html);
})
app.listen(8000);
