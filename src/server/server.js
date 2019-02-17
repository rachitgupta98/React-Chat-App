const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const PORT = 4000;

//setup mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/chatapp", { useNewUrlParser: true });
mongoose.connection
  .once("open", function() {
    console.log("connection established");
  })
  .on("error", function(error) {
    console.log("error occured");
  });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(require("../routes/api"));

// app.use("/chat", require("../routes/api"));
//setup server
const server = app.listen(PORT, function() {
  console.log("server running");
});

const io = require("socket.io")(server); // socket setup
let users = 0;
io.on("connection", function(socket) {
  //console.log("socket server is connect");
  //create a function to send status
  sendStatus = function(s) {
    socket.emit(" status", s);
  };

  users++;
  socket.emit("newclientconnect", { description: "Hey, welcome!" });

  //no of online user
  io.sockets.emit("broadcast", { description: users + " " + "is connected" });

  //handle and messages
  socket.on("chat", function(data) {
    io.sockets.emit("chat", data);
  });

  //showing user typing
  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });

  //show user disconnect
  socket.on("disconnect", function() {
    users--;
    io.sockets.emit("broadcast", { description: users + " " + "is connected" });
    console.log("disconnected");
  });
});
