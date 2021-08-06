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

      if (element.abilities) {
        var fieldset = document.createElement("fieldset");
        var legend = document.createElement("legend");
        legend.textContent = "Actions";
        fieldset.appendChild(legend);
        fieldset.innerHTML +=
          Object.keys(element.abilities)
            .map((x) => {
              var button = document.createElement("button");
              button.textContent = x;
              button.dataset.action = x;
              return button.outerHTML;
            })
            .join(" ");
        fieldset.innerHTML += " <button data-turn='true'>Done!</button> ";
        li.appendChild(fieldset);
      }
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
    socket.emit(EVENTS.updateCharacter, e.target.dataset);
  })
);
