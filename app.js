var connect = require("connect"),
    connectRoute = require("connect-route"),
    serveStatic = require("serve-static"),
    app = connect();

app.use(connectRoute(function(router) {
    router.get("/sayHello/:firstName/:lastName", function(req, res) {
	var userName = req.params.firstName + " " + req.params.lastName,
            html = "<!doctype html>" +
		"<html><head><title>Hello " + userName + "</title></head>" +
		"<body><h1>Hello, " + userName + "!</h1></body></html>";

	res.end(html);
    });
}));

app.use(serveStatic("./public"));

app.listen(8000);
