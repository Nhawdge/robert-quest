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
    game.connections[conn].emit(
      "update",
      game.entities.map((x) => ({
        id: x.id,
        ...x.components.map((y) => y.displayForPlayer()),
      }))
    );
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
