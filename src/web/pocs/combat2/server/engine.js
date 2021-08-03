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
let GAMES = {};

const EVENTS = {
  connect: "connection",
  disconnect: "disconnect",
  updateCharacter: "updateCharacter",
  commitCharacter: "commitCharacter",
};

io.sockets.on(EVENTS.connect, function (socket) {
  console.log(EVENTS.connect, socket.id);
  CONNECTIONS[socket.id] = socket;

  // TODO Make rooms later

  GAMES[socket.id] = new Game();
  var player = new Entity();
  player.components.push(new HealthComponent(100));

  GAMES[socket.id].entities.push(player);

  socket.on(EVENTS.disconnect, function () {
    console.log("Disconnected", socket.id);
    delete CONNECTIONS[socket.id];
  });

  socket.on(EVENTS.updateCharacter, (data) => {
    var player = GAMES[socket.id].entities.find((x) => (x.id = socket.id));
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
    updateAll(socket);
  });

  socket.on(EVENTS.commitCharacter, (data) => {
    CONNECTIONS[socket.id].gameData = updateAll(socket);
  });

  updateAll(socket);
});

function updateAll(socket) {
  GAMES[socket.id].updateState();
  Object.keys(CONNECTIONS).forEach((conn) => {
    CONNECTIONS[conn].emit(
      "update",
      GAMES[socket.id].entities.map((x) =>
        x.components.map((y) => y.displayForPlayer())
      )
    );
  });
}

class Game {
  entities = [];
  systems = [];
  constructor() {
    /// Inject all Systems;
    this.systems.push(new HealthSystem());
  }

  updateState() {
    this.systems.forEach((system) => {
      this.entities.forEach(system.Tick);
    });
  }
}

class Entity {
  constructor(id) {
    this.components = [];
    this.id = id ?? parseInt(Math.random().toString().substr(2));
  }
  addOrUpdateComponent(component) {
    var existingComponent = this.components.find(
      (x) => component.constructor.name == x.constructor.name
    );

    if (!existingComponent) {
      this.components.push(component);
    } else {
    }
  }
}

class Component {
  displayForPlayer() {
    throw "Implement me";
  }
}

class System {
  Tick() {
    throw "Implement me";
  }
}

class HealthSystem extends System {
  Tick(component) {
    component.CurrentHealth += component.RegenerationRate;
    if (component.CurrentHealth > component.Max) {
      component.CurrentHealth = component.max;
    }
  }
}

class HealthComponent extends Component {
  constructor(max) {
    super();

    this.Max = max || 10;
    this.CurrentHealth = this.Max;
    this.RegenerationRate = 1;
  }
  displayForPlayer() {
    return `Health: ${this.CurrentHealth} / ${this.Max}`;
  }
}

class CharacterClass extends Component {
  constructor(name) {
    super();

    this.Name = name ?? "None";
  }
  displayForPlayer() {
    return `Class: ${this.Name}`;
  }
}

class Background extends Component {
  constructor(name) {
    super();

    this.Name = name || "None";
  }
  displayForPlayer() {
    return `Background: ${this.Name}`;
  }
}
class Equipment extends Component {
  constructor() {
    super();

    this.Slots = {
      MainHand: "",
      Chest: "",
    };
  }
  displayForPlayer() {
    var gear = Object.keys(this.Slots).map((x) => `${x}: ${this.Slots[x]}`);
    return gear.join("\n");
  }
}
