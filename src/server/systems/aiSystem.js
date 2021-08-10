import Action from "../components/actionComponent.js";
import AiComponent from "../components/aiComponent.js";
import Label from "../components/labelComponent.js";
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

        var index = Math.floor(Math.random() * hostileEntities.length);
        target = hostileEntities[index];

        if (target) {
          var action = new Action(target.id);
          action.Act = "Attack";
          entity.addOrUpdateComponent(action);
        }

        turn.TurnEnded = true;
      }
    });
  }
}
