var socket = io();
console.log("hello");
// Query DOM
let message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  fdbck = document.getElementById("msg");

// Emit events
btn.addEventListener("click", function () {
  socket.emit("text", {
    message: message.value,
    handle: handle.value,
  });
  message.value = "";
});

// Listen for events
socket.on("text", function (data) {
  fdbck.innerHTML = " ";

  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

// To display a msg about who's typing
message.addEventListener("keypress", function () {
  socket.emit("typing", handle.value);
});

socket.on("typing", function (data) {
  fdbck.innerHTML = "<p><em>" + data + " is typing...</em></p>";
});
