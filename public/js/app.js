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
        var servo = new five.Servo(10);
        var angle = 90;
        socket.on('valueData', function(data){
            angle = data;
        });
        setInterval(function(){
            console.log(angle);
        }, 500);
    }); 
});


app.get("/", function (req, res) {
  res.sendFile("/home/pi/Leviathan/public/index.html");
});

server.listen(3000);