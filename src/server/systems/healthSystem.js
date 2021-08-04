import HealthComponent from "../components/healthComponent.js";
import Turn from "../components/turnComponent.js";
import System from "./system.js";

export default class HealthSystem extends System {
  Tick(entity) {
    var health = entity.getComponentByType(HealthComponent);
    var turn = entity.getComponentByType(Turn);

    if (turn?.TurnEnded) {
      health.CurrentHealth += health.RegenerationRate;
    }

    if (health?.CurrentHealth > health.Max) {
      health.CurrentHealth = health.Max;
    }
  }
  TickAll(components) {}
}
