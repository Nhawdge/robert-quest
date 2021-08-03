var query = { room: "promptlater" };

var socket = io("", query);

const EVENTS = {
  connect: "connection",
  disconnect: "disconnect",
  updateCharacter: "updateCharacter",
  commitCharacter: "commitCharacter",
};

socket.on("update", function (data) {
  var connections = document.querySelector("#activeConnections");
  console.log(data);
  connections.textContent = "";
  data
    .filter((x) => x)
    .forEach((element) => {
      var li = document.createElement("li");
      li.innerHTML = Object.keys(element)
        .map((key) => `${key}: ${element[key]}`)
        .join("<br>");
      connections.appendChild(li);
    });
});

document.querySelectorAll("input").forEach((x) => {
  x.addEventListener("blur", (e) => {
    var updateVals = {};
    updateVals[e.target.name] = e.target.value;
    socket.emit("updateCharacter", updateVals);
  });
});

document.querySelectorAll("button").forEach((x) =>
  x.addEventListener("click", function (e) {
    if (e.target.dataset.done) {
      socket.emit(EVENTS.commitCharacter);
    } else {
      socket.emit(EVENTS.updateCharacter, e.target.dataset);
    }
  })
);
