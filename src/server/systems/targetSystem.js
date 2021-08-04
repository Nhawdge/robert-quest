import ActionComponent from "../components/actionComponent.js";
import Label from "../components/labelComponent.js";
import System from "./system.js";

export default class TargetSystem extends System {
  Tick(entity) {}

  TickAll(entities) {
    entities.forEach((entity) => {
      var target = entity.getComponentByType(ActionComponent);
      if (!target) {
        return;
      }
      target.TargetName = "";

      var targetEntity = entities.find((x) => (x.id = target.TargetId));
      if (targetEntity) {
        var label = targetEntity.getComponentByType(Label);
        if (label) {
          target.TargetName = label.Name;
        }
      }
    });
  }
}
