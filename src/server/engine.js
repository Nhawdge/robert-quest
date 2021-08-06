import express from "express";
import { generateEnemy, generatePlayer, updateAll } from "./gameHelpers.js";
import socketIoWildcard from "socketio-wildcard";
import { Server } from "socket.io";
import HealthSystem from "./systems/healthSystem.js";
import HealthComponent from "./components/healthComponent.js";
import CharacterClass from "./components/characterClassComponent.js";
import Background from "./components/backgroundComponent.js";
import Equipment from "./components/equipmentComponent.js";
import Turn from "./components/turnComponent.js";
import TurnSystem from "./systems/turnSystem.js";
import AttributeComponent from "./components/attributesComponent.js";
import AttributeSystem from "./systems/attributeSystem.js";
import Action from "./components/actionComponent.js";
import Label from "./components/labelComponent.js";
import TargetSystem from "./systems/targetSystem.js";
import ActionSystem from "./systems/actionSystem.js";
import AttackSystem from "./systems/attackSystem.js";
import Entity from "./entity.js";
import AiSystem from "./systems/aiSystem.js";
import Hostility from "./components/hostilityComponent.js";
import Scene from "./components/sceneComponent.js";

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

  var player = generatePlayer(socket.id);

  GAMES[gameName].entities.push(player);

  /// Enemy
  var enemy = generateEnemy(1);
  GAMES[gameName].entities.push(enemy);
  /// Enemy

  socket.on(EVENTS.disconnect, function () {
    console.log("Disconnected", socket.id);
    delete GAMES[gameName].connections[socket.id];
    var playerIndex = GAMES[gameName].entities.findIndex(
      (x) => x.id == socket.id
    );
    if (playerIndex >= 0) {
      var removed = GAMES[gameName].entities.splice(playerIndex, 1);
      console.log("Removed", removed.id);
    }
    updateAll(GAMES[gameName]);
  });

  socket.on(EVENTS.updateCharacter, (data) => {
    var player = GAMES[gameName].entities.find((x) => x.id == socket.id);
    if (!player) {
      console.warn("No player found cannot proceed");
      return;
    }
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
        case "turn":
          var turn = new Turn();
          turn.TurnEnded = true;
          player.addOrUpdateComponent(turn);
          break;
        case "target":
          var action = new Action(data[key]);
          player.addOrUpdateComponent(action);
          break;
        case "name":
          var name = new Label(data[key]);
          player.addOrUpdateComponent(name);
          break;
        case "action":
          var action = new Action();
          action.Act = data[key];
          player.addOrUpdateComponent(action);
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
    var singleton = new Entity();
    singleton.addOrUpdateComponent(new Scene());

    this.entities.push(singleton);

    /// Inject all Systems; ORDER IS IMPORTANT
    this.systems.push(new AiSystem());
    this.systems.push(new HealthSystem());
    this.systems.push(new AttributeSystem());
    this.systems.push(new ActionSystem());
    this.systems.push(new AttackSystem());
    this.systems.push(new TargetSystem());

    this.systems.push(new TurnSystem());
  }

  updateState() {
    this.systems.forEach((system) => {
      system.TickAll(this.entities);
    });
    this.systems.forEach((system) => {
      this.entities.forEach(system.Tick);
    });
  }
}
