let express = require("express");
let socket = require("socket.io");

let app = express();
app.set("port", process.env.PORT || 5000);
app.use(express.static(__dirname+"/public"));

let server = app.listen(app.get("port"), function () {
  console.log("Listening to port 4000");
});

let io = socket(server);

io.on("connection", (socket) => {
  console.log("Connection -->" + socket.id);

  socket.on("text", function (data) {
    console.log(data);
    io.sockets.emit("text", data);
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
