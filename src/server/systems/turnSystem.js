import System from "./system.js";
import Turn from "../components/turnComponent.js";

export default class TurnSystem extends System {
  Tick(entity) {
    var turn = entity.getComponentByType(Turn);
    if (!turn) {
      return;
    }
    turn.TurnEnded = false;
  }
  TickAll(components) {}
}
