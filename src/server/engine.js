import express from "express";
import updateAll from "./helpers.js";
import socketIoWildcard from "socketio-wildcard";
import { Server } from "socket.io";
import HealthSystem from "./systems/healthSystem.js";
import HealthComponent from "./components/healthComponent.js";
import CharacterClass from "./components/characterClassComponent.js";
import Background from "./components/backgroundComponent.js";
import Equipment from "./components/equipmentComponent.js";

const app = express();

app.use(express.static("./src/web/"));

let server = app.listen(process.env.PORT || 4444, listen);

function listen() {
  let host = server.address().address;
  let port = server.address().port;
  console.log("http://localhost:4444", host, port);
}

let io = new Server(server);

var middleware = socketIoWildcard();
io.use(middleware);

let GAMES = {};

const EVENTS = {
  connect: "connection",
  disconnect: "disconnect",
  updateCharacter: "updateCharacter",
  commitCharacter: "commitCharacter",
};

io.sockets.on(EVENTS.connect, function (socket) {
  console.log(EVENTS.connect, socket.id);

  // TODO Make rooms later
  const gameName = "awesome";
  if (!GAMES[gameName]) {
    GAMES[gameName] = new Game();
  }

  GAMES[gameName].connections[socket.id] = socket;

  var player = new Entity(socket.id);
  player.components.push(new HealthComponent(100));

  GAMES[gameName].entities.push(player);

  console.log(Object.keys(GAMES));

  socket.on(EVENTS.disconnect, function () {
    console.log("Disconnected", socket.id);
    delete GAMES[gameName].connections[socket.id];
    var playerIndex = GAMES[gameName].entities.findIndex(
      (x) => x.id == socket.id
    );
    console.log("pi", playerIndex);
    if (playerIndex >= 0) {
      GAMES[gameName].entities.splice(player, 1);
    }
    updateAll(GAMES[gameName]);
  });

  socket.on(EVENTS.updateCharacter, (data) => {
    var player = GAMES[gameName].entities.find((x) => x.id == socket.id);
    console.log("updateCharacter", data);
    Object.keys(data).forEach((key) => {
      switch (key) {
        case "background":
          player.addOrUpdateComponent(new Background(data[key]));
          break;
        case "class":
          player.addOrUpdateComponent(new CharacterClass(data[key]));
          break;
        case "weapon":
          var equipment = new Equipment();
          equipment.Slots["MainHand"] = data[key];
          player.addOrUpdateComponent(equipment);
          break;
      }
    });

    player.components.push();
    updateAll(GAMES[gameName]);
  });
  updateAll(GAMES[gameName]);
});

class Game {
  entities = [];
  systems = [];
  connections = {};
  constructor() {
    /// Inject all Systems;
    this.systems.push(new HealthSystem());
  }

  updateState() {
    this.systems.forEach((system) => {
      this.entities.forEach(system.Tick);
    });

    this.systems.forEach((system) => {
      system.TickAll(this.entities);
    });
  }
}

class Entity {
  constructor(id) {
    this.components = [];
    this.id = id || parseInt(Math.random().toString().substr(2));
  }

  addOrUpdateComponent(component) {
    var existingComponent = this.components.find(
      (x) => component.constructor.name == x.constructor.name
    );

    if (!existingComponent) {
      this.components.push(component);
    } else {
      Object.keys(component).forEach(
        (x) => (existingComponent[x] = component[x])
      );
    }
  }
}
