var connect = require("connect"),
    connectRoute = require("connect-route"),
    serveStatic = require("serve-static"),
    bodyParser = require("body-parser"),
    mustache = require("mustache"),
    requirejs = require("requirejs"),
    parentTmpl,
    app = connect();

// configure requirejs to fall back to Node's require if a module is not found
requirejs.config({ nodeRequire: require });

app.use(serveStatic("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(connectRoute(function(router) {

    router.post("/theme", function(req, res) {
        var theme = {
                main: req.body.mainColor,
                secondary: req.body.secondaryColor,
                border: req.body.borderStyle,
                corners: req.body.borderRadius
            };

        // load and render the CSS template
        requirejs(["text!public/css/theme.css"], function(tmpl) {
            var css = mustache.to_html(tmpl, theme);
            res.writeHead(200, {
                "Content-Type": "text/css",
                "Content-Length": css.length
            });
            res.end(css);
        });
    });

    router.post("/builder", function(req, res) {
        var options = {
                shim: req.body.html5shim,
                flash: req.body.useFlash,
                sockets: req.body.useWebSockets,
                jsonp: req.body.useJsonp
            };

        // load and render the JS template
        requirejs(["text!public/js/builder.js"], function(tmpl) {
            var js = mustache.to_html(tmpl, options);
            res.writeHead(200, {
                "Content-Type": "application/javascript",
                "Content-Length": js.length
            });
            res.end(js);
        });
    });
}));

app.listen(8000);
