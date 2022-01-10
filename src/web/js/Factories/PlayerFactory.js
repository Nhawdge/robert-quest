import Entity from "../Entity/Entity.js";
import Render from "../Components/Render.js";
import Controls from "../Components/Controls.js";

const playerComponents = [Render,Controls];

export function GeneratePlayer() {
  var player = new Entity();
  var render = new Render("character_maleAdventurer_run0");
  var controls = new Controls();

  player.Components.push(render);
  player.Components.push(controls);

  return player;
}

export function IsPlayer(entity) {
  playerComponents.forEach((component) => {
    if (!entity.Components.GetComponent(component)) {
      return false;
    }
  });
  return true;
}
