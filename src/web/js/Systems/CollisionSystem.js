import { IsCollidable } from "../Factories/CollisionFactory.js";

export default class CollisionSystem {
  constructor() {
    this.WorldEntities = [];
  }
  Load(engine) {}
  UpdateAll(engine) {
    var collidables = engine.Entities.filter((x) => IsCollidable(x));
  }
}
