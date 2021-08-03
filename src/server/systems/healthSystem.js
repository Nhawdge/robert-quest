import System from "./system.js";

export default class HealthSystem extends System {
  Tick(component) {
    component.CurrentHealth += component.RegenerationRate;
    if (component.CurrentHealth > component.Max) {
      component.CurrentHealth = component.max;
    }
  }
}
