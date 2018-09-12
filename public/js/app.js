
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
        var led = new five.Led(13);
        led.blink(1000);
        socket.on("data", function(data){
            var blinkRate = data * 10;
            console.log(blinkRate);
        });
    }); 
});


app.get("/", function (req, res) {
  res.sendFile("/home/pi/Leviathan/public/index.html");
});

server.listen(3000);