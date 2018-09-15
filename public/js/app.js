
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
        var servo = new five.Servo({
            pin: 10,
            startAt: 90
        });
        // var angle = 90;
        // var currentAngle = 90;
        this.repl.inject({
            servo: servo
        });
        servo.to(90);
        socket.on("data", function(data){
            servo.to(data);
            console.log(data);
        });
        // setInterval(function(){moveTo()}, 10);
        // function moveTo() {
        //     if(currentAngle !== angle){
        //         if(angle - currentAngle > 0){
        //             servo.to(currentAngle + 1);
        //         } else if(angle - currentAngle < 0 ){
        //             servo.to(currentAngle - 1);
        //         }
        //     }
        // }
    }); 
});


app.get("/", function (req, res) {
  res.sendFile("/home/pi/Leviathan/public/index.html");
});

server.listen(3000);