var query = { room: "promptlater" };

var socket = io("", query);

const EVENTS = {
  connect: "connection",
  disconnect: "disconnect",
  updateCharacter: "updateCharacter",
  commitCharacter: "commitCharacter",
};

socket.on("update", function (data) {
  var connections = document.querySelector("#entities");
  connections.textContent = "";
  data
    .filter((x) => x)
    .forEach((element) => {
      var li = document.createElement("li");
      li.innerHTML = element.components.join("<br>");
      li.dataset.target = element.id;
      li.addEventListener("click", function (e) {
        socket.emit(EVENTS.updateCharacter, e.target.dataset);
      });

      connections.appendChild(li);
    });
});

document.querySelectorAll("input").forEach((x) => {
  x.addEventListener("blur", (e) => {
    e.stopImmediatePropagation();

    var updateVals = {};
    updateVals[e.target.name] = e.target.value;
    socket.emit("updateCharacter", updateVals);
  });
});

document.querySelectorAll("button").forEach((x) =>
  x.addEventListener("click", function (e) {
    socket.emit(EVENTS.updateCharacter, e.target.dataset);
  })
);
