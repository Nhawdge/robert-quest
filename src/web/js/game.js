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

socket.on("chat", (data) => {
  var chatWindow = document.querySelector("#chat ol");
  var li = document.createElement("li");
  li.innerText = data;
  chatWindow.appendChild(li);
  chatWindow.scroll(0, chatWindow.scrollHeight);
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  var msg = e.target.querySelector('input[name="chat"]').value;
  socket.emit("chat", msg);
  e.target.querySelector('input[name="chat"]').value = "";
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
