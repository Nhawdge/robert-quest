import Action from "../components/actionComponent.js";
import HealthComponent from "../components/healthComponent.js";
import Label from "../components/labelComponent.js";
import System from "./system.js";

export default class TargetSystem extends System {
  Tick(entity) {}

  TickAll(entities) {
    entities.forEach((entity) => {
      var target = entity.getComponentByType(Action);
      if (!target) {
        return;
      }
      target.TargetName = "";

      var targetEntity = entities.find((x) => x.id == target.TargetId);

      if (targetEntity) {
        if (!targetEntity.getComponentByType(HealthComponent)) {
          return;
        }
        var label = targetEntity.getComponentByType(Label);

        if (label) {
          target.TargetName = label.Name;
        }
      }
    });
  }
}
