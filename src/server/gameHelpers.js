import Abilities from "./components/abilitiescomponent.js";
import AiComponent from "./components/aiComponent.js";
import AttributeComponent from "./components/attributesComponent.js";
import HealthComponent from "./components/healthComponent.js";
import Hostility from "./components/hostilityComponent.js";
import Label from "./components/labelComponent.js";
import Turn from "./components/turnComponent.js";
import Entity from "./entity.js";

export function updateAll(game) {
  game.updateState();
  Object.keys(game.connections).forEach((conn) => {
    var dataOut = game.entities.map((x) => {
      var uiData = {
        id: x.id,
        components: x.components
          .map((y) => y.displayForPlayer())
          .filter((x) => x),
      };

      if (conn == x.id) {
        uiData.abilities = { Attack: "", Defend: "", Heal: "" };
      }

      return uiData;
    });

    game.connections[conn].emit("update", dataOut);
  });
}

const randomNames = ["Bear", "Goat", "Jim", "Wolf"];

export function generateEnemy(baseStrength) {
  var enemy = new Entity();

  enemy.addOrUpdateComponent(new HealthComponent(baseStrength * 10));
  enemy.addOrUpdateComponent(new AttributeComponent());
  enemy.addOrUpdateComponent(new AiComponent());
  enemy.addOrUpdateComponent(new Turn());
  enemy.addOrUpdateComponent(
    new Label(randomNames[Math.floor(Math.random() * randomNames.length)])
  );
  enemy.addOrUpdateComponent(new Hostility("environment"));
  return enemy;
}

export function generatePlayer(id) {
  var player = new Entity(id);
  player.addOrUpdateComponent(new HealthComponent(100));
  player.getComponentByType(HealthComponent).CurrentHealth = 95;
  player.addOrUpdateComponent(new Turn());
  player.addOrUpdateComponent(new AttributeComponent());
  player.addOrUpdateComponent(new Label("Player"));
  player.addOrUpdateComponent(new Hostility("players"));
  player.addOrUpdateComponent(new Abilities());
  
  return player;
}
