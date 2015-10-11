var connect = require("connect"),
    connectRoute = require("connect-route"),
    serveStatic = require("serve-static"),
    mustache = require("mustache"),
    requirejs = require("requirejs"),
    parentTmpl,
    app = connect();

// configure requirejs to fall back to Node's require if a module is not found
requirejs.config({ nodeRequire: require });

app.use(serveStatic("./public"));
app.use(connectRoute(function(router) {

    router.get("/show/:tmpl/:firstName/:lastName", function(req, res) {
        var userName = {
                firstName: req.params.firstName,
                lastName: req.params.lastName
            };

        // once the parent template is loaded, render the page
        requirejs(["text!public/parent.html"], function(_parentTmpl) {
            parentTmpl = _parentTmpl;
            render(res, req.params.tmpl + ".html", userName);
        });
    });

}));

app.listen(8000);

function render(res, filename, data, style, script, callback) {
    // load the template and return control to another function or send the response
    requirejs(["text!public/" + filename], function(tmpl) {
        if (callback) {
            callback(res, tmpl, data, style, script);
        } else {
            // render parent template with page template as a child
            var html = mustache.to_html(
                parentTmpl,
                data,
                {content: tmpl, stylesheets: style || "", scripts: script || ""}
            );
            res.end(html);
        }
    });
}

// test: http://127.0.0.1:8000/show/hello/Mister/Magoo
