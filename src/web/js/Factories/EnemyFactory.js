import Entity from "../Entity/Entity.js";
import Render from "../Components/Render.js";
import Ai from "../Components/Ai.js";

const playerComponents = [Render, Ai];

export function GenerateEnemy() {
  var enemy = new Entity();
  var render = new Render("character_malePerson_cheer0");
  render.Position.X = 100;
  render.Position.Y = 100;
  var AI = new Ai();

  enemy.Components.push(render);
  enemy.Components.push(AI);
  return enemy;
}

export function IsEnemy(entity) {
  playerComponents.forEach((component) => {
    if (!entity.Components.GetComponent(component)) {
      return false;
    }
  });
  return true;
}
