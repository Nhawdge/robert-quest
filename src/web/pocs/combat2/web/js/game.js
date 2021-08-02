var socket = io();

socket.on("update", function (data) {
  var connections = document.querySelector("#activeConnections");
  connections.textContent = "";
  data.forEach((element) => {
    var li = document.createElement("li");
    li.textContent = element;
    connections.appendChild(li);
  });
});

document
  .querySelector("button[data-class]")
  .addEventListener("click", function (e) {
    var name = document.querySelector('input[name="name"]').value;
    socket.emit("updateCharacter", {class: e.target.dataset.class, name});
  });
