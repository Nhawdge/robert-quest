import Vector2 from "../Vector.js";
import Controls from "../Components/Controls.js";

export default class TargetSystem {
  constructor() {}
  Load() {
    console.log("TargetSystem loaded");
  }
  UpdateAll(engine) {
    // var controllableEntity = engine.Entities.find((x) => x.GetComponent(Controls));
    // myControls = controllableEntity.GetComponent(Controls);
  }
}
