import Action from "../components/actionComponent.js";
import HealthComponent from "../components/healthComponent.js";
import System from "./system.js";
import { turnsInProgress } from "./systemHelpers.js";
import AttributeComponent from "../components/attributesComponent.js";

export default class AttackSystem extends System {
  Tick(entity) {}
  TickAll(entities) {
    var inProgress = turnsInProgress(entities);
    if (inProgress) {
      return;
    }

    var entitiesWithAction = entities.filter((x) =>
      x.getComponentByType(Action)
    );
    entitiesWithAction.forEach((entity) => {
      var action = entity.getComponentByType(Action);

      if (action.Act == "Attack") {
        var target = entities.find((x) => x.id == action.TargetId);
        if (!target) {
          return;
        }
        var hp = target.getComponentByType(HealthComponent);

        if (!hp) {
          return;
        }

        var attributes = entity.getComponentByType(AttributeComponent);

        var dmg = Math.floor(
          Math.random() * (attributes.MeleeMax - attributes.MeleeMin) +
            attributes.MeleeMin
        );
        hp.CurrentHealth -= dmg;
      }
    });
  }
}
