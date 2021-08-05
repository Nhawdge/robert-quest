import System from "./system.js";
import Turn from "../components/turnComponent.js";
import { turnsInProgress } from "./systemHelpers.js";

export default class TurnSystem extends System {
  Tick(entity) {}
  
  TickAll(entities) {
    var inProgress = turnsInProgress(entities);
    if (!inProgress) {
      console.log("Round ended, Updating Turns");
      entities.forEach((entity) => {
        var turn = entity.getComponentByType(Turn);
        if (!turn) {
          return;
        }
        turn.TurnEnded = false;
      });
    }
  }
}
