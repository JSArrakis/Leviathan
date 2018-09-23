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
        var one = new five.Servo({
            address: 0x40,
            controller: "PCA9685",
            pin: 13,
        });
        var two
        socket.on('valueData', function(data){
            var angle = data;
            console.log(angle);
            one.stop();
            one.to(angle, 1000);
        });
    }); 
});


app.get("/", function (req, res) {
  res.sendFile("/home/pi/Leviathan/public/index.html");
});

server.listen(3000);