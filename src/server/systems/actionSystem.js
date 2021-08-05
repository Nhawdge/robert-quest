import System from "./system.js";
import Turn from "../components/turnComponent.js";
import Action from "../components/actionComponent.js";
import { turnsInProgress } from "./systemHelpers.js";

export default class ActionSystem extends System {
  Tick(entity) {}
  TickAll(entities) {
    var inProgress = turnsInProgress(entities);

    entities.forEach((entity) => {});
  }
}
