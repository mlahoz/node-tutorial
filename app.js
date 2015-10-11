var connect = require("connect"),
    // create socket.io server on port 1337
    io = require("socket.io").listen(1337),
    serveStatic = require("serve-static"),
    app = connect();

app.use(serveStatic("./public"));
app.listen(8000);

// listen for connection from an individual client
io.sockets.on("connection", function(socket) {
    // listen for setName event
    socket.on("setName", function(data) {
        var userName = data.firstName + " " + data.lastName;
        // publish nameSet event with new username
        socket.emit("nameSet", {userName: userName});
    });
});
