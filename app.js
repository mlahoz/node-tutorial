var http = require("http"),    querystring = require("querystring"),    redis = require("redis"),    db = redis.createClient(32768, "192.168.99.100");var connect = require("connect"),    connectRoute = require("connect-route"),    serveStatic = require("serve-static"),    bodyParser = require("body-parser"),    redis = require("redis"),    db = redis.createClient(32768, "192.168.99.100"),    app = connect();app.use(serveStatic("./public"));app.use(bodyParser.urlencoded({ extended: false }));app.use(function (req, res) {    var firstName = req.body.firstName,        lastName = req.body.lastName,        userName = firstName + " " + lastName;    // store the submitted lastName using the firstName as a key    db.hset("users", firstName, lastName, function(err, response) {        var html = "<!doctype html>" +            "<html><head><title>Hello " + userName + "</title></head>" +            "<body><h1>Hello, " + userName + "!</h1></body></html>";        res.end(html);    });});app.listen(8000);