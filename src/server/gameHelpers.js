import Abilities from "./components/abilitiescomponent.js";
import AiComponent from "./components/aiComponent.js";
import AttributeComponent from "./components/attributesComponent.js";
import Background from "./components/backgroundComponent.js";
import CharacterClass from "./components/characterClassComponent.js";
import HealthComponent from "./components/healthComponent.js";
import Hostility from "./components/hostilityComponent.js";
import Label from "./components/labelComponent.js";
import Turn from "./components/turnComponent.js";
import Entity from "./entity.js";

export function updateAll(game) {
  game.updateState();
  Object.keys(game.connections).forEach((conn) => {
    var combat = game.entities.map((x) => ({
      id: x.id,
      components: x.components
        .map((y) => y.displayForPlayer(conn == x.id))
        .filter((x) => x && x.displayZone == "combat"),
    }));
    combat = combat.filter((x) => x.components.length);

    var character = game.entities.map((x) => ({
      id: x.id,
      components: x.components
        .map((y) => y.displayForPlayer(conn == x.id))
        .filter((x) => x && x.displayZone == "character"),
    }));
    character = character.filter((x) => x.components.length);

    var actions = game.entities.map((x) => ({
      id: x.id,
      components: x.components
        .map((y) => y.displayForPlayer(conn == x.id))
        .filter((x) => x && x.displayZone == "actions"),
    }));
    actions = actions.filter((x) => x.components.length);

    game.connections[conn].emit("update", { combat, character, actions });
  });
}

const randomNames = ["Bear", "Goat", "Jim", "Wolf"];

export function generateEnemy(baseStrength) {
  var enemy = new Entity();

  enemy.addOrUpdateComponent(new HealthComponent(baseStrength * 10));
  enemy.addOrUpdateComponent(new AttributeComponent());
  enemy.addOrUpdateComponent(new AiComponent(baseStrength));
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
  player.addOrUpdateComponent(new Background());
  player.addOrUpdateComponent(new CharacterClass());

  return player;
}
