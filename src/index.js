// var five = require("johnny-five");

// // Johnny-Five will try its hardest to detect the port for you,
// // however you may also explicitly specify the port by passing
// // it as an optional property to the Board constructor:
// var board = new five.Board({
//   port: "/dev/ttyACM0"
// });

// // The board's pins will not be accessible until
// // the board has reported that it is ready
// board.on("ready", function() {
//   this.pinMode(13, this.MODES.OUTPUT);

//   this.loop(500, () => {
//     // Whatever the last value was, write the opposite
//     this.digitalWrite(13, this.pins[13].value ? 0 : 1);
//   });
// });

var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var five = require("johnny-five");
var board = new five.Board({
  port: "/dev/ttyACM0"
});

board.on("ready", function() {
  var led = new five.Led(13);
  led.blink(1000);
  console.log("Blink started at default interval of 1000ms");

  io.on("connection", function(socket) {
    console.log("Connected to Socket");
    socket.on("data", function(data) {
      console.log("New interval: " + data + "ms");
      led.blink(data);
    });
  });
});

app.get("/", function (req, res) {
  res.sendFile("/home/pi/Leviathan/index.html");
});

server.listen(3000);

