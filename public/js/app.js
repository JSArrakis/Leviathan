var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var five = require("johnny-five");
var board = new five.Board({
  port: "/dev/ttyACM0"
});

console.log("Ready!");


io.on("connection", function(socket) {
    board.on("ready", function() {
        var servo = new five.Servo(10);
        this.repl.inject({
            servo: servo
        });
        socket.on("data", function(data){

        });
        servo.sweep();
    }); 
});


app.get("/", function (req, res) {
  res.sendFile("/home/pi/Leviathan/public/index.html");
});

server.listen(3000);