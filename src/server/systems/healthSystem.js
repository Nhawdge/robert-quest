import HealthComponent from "../components/healthComponent.js";
import Turn from "../components/turnComponent.js";
import System from "./system.js";
import { turnsInProgress } from "./systemHelpers.js";

export default class HealthSystem extends System {
  Tick(entity) {
    var health = entity.getComponentByType(HealthComponent);
    var turn = entity.getComponentByType(Turn);

    if (!health) {
      return;
    }
    if (!turn) {
      return;
    }

    if (health?.CurrentHealth > health.Max) {
      health.CurrentHealth = health.Max;
    }
  }

  TickAll(entities) {
    if (turnsInProgress(entities)) {
      return;
    }

    entities.forEach((entity, index) => {
      var hp = entity.getComponentByType(HealthComponent);
      if (hp?.CurrentHealth <= 0) {
        entities.splice(index, 1);
      }
      if (!turnsInProgress(entities)) {
        var health = entity.getComponentByType(HealthComponent);
        health.CurrentHealth += health.RegenerationRate;
      }
    });
  }
}
