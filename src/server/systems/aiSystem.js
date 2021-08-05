import Action from "../components/actionComponent.js";
import AiComponent from "../components/aiComponent.js";
import Turn from "../components/turnComponent.js";
import System from "./system.js";
import { getAllHostileEntities } from "./systemHelpers.js";

export default class AiSystem extends System {
  Tick(entity) {}
  TickAll(entities) {
    entities.forEach((entity) => {
      var ai = entity.getComponentByType(AiComponent);
      if (!ai) {
        return;
      }

      var turn = entity.getComponentByType(Turn);
      if (turn) {
        if (turn.TurnEnded) {
          return;
        }

        var target = null;
        var hostileEntities = getAllHostileEntities(entity, entities);
        console.log(hostileEntities);
        var index = Math.floor(Math.random() * hostileEntities.length);
        target = entities[index];

        var action = new Action(target.id);
        action.Act = "Attack";
        entity.addOrUpdateComponent(action);

        turn.TurnEnded = true;
      }
    });
  }
}
