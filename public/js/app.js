var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var five = require("johnny-five");
var board = new five.Board({
  port: "/dev/ttyACM0"
});

console.log("Nodebot Started!");
board.on("ready", function() {
    console.log("Board Ready!")
    io.on("connection", function(socket) {
        var servo = new five.Servo({
            pin: 10,
            startAt: 90
        })
        servo.to(0);
        servo.to(180);
        socket.on('valueData', function(data){
            var blinkRate = data * 100;
            console.log(blinkRate);
        });
    }); 
});


app.get("/", function (req, res) {
  res.sendFile("/home/pi/Leviathan/public/index.html");
});

server.listen(3000);