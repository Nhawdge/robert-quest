const express = require("express");

const app = express();

app.use(express.static("./src/web/pocs/combat2/web"));

let server = app.listen(process.env.PORT || 4444, listen);

function listen() {
  let host = server.address().address;
  let port = server.address().port;
  console.log("http://localhost:4444", host, port);
}

let io = require("socket.io")(server);
var middleware = require("socketio-wildcard")();
io.use(middleware);

let CONNECTIONS = {};

const EVENTS = {
  connect: "connection",
  disconnect: "disconnect",
  updateCharacter: "updateCharacter",
};

io.sockets.on(EVENTS.connect, function (socket) {
  console.log(EVENTS.connect, socket.id);
  CONNECTIONS[socket.id] = socket;

  socket.on(EVENTS.disconnect, function () {
    console.log("Disconnected", socket.id);
    delete CONNECTIONS[socket.id];
  });

  socket.on(EVENTS.updateCharacter, (data) => {
    console.log("updateCharacter", data);
    CONNECTIONS[socket.id].gameData = data;
    updateAll();
  });

  updateAll();
});

function updateAll() {
  Object.keys(CONNECTIONS).forEach((conn) => {
    CONNECTIONS[conn].emit(
      "update",
      Object.keys(CONNECTIONS).map((x) => CONNECTIONS[x]?.gameData)
    );
  });
}

class GameEngine {
  constructor() {}

  updateState() {}
}

class Entity {
  components = [];

  constructor(components) {
    this.components = components;
  }
}

class Component {}

class System {}
