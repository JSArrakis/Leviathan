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
            controller: "PCA9685",
            pin: 15,
        });
        socket.on('valueData', function(data){
            if(data !== angle){
                var angle = data;
                console.log(angle);
                one.stop();
                one.to(angle, 10);
            }
        });
    }); 
});


app.get("/", function (req, res) {
  res.sendFile("/home/pi/Leviathan/public/index.html");
});

server.listen(3000);