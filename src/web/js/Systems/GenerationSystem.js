import { GeneratePlayer } from "../factories/PlayerFactory.js";
import { GenerateEnemy } from "../factories/EnemyFactory.js";

export default class GenerationSystem {
  Load(engine) {
    var player = GeneratePlayer();
    engine.Entities.push(player);

    var enemy = GenerateEnemy();
    engine.Entities.push(enemy);
  }
  UpdateAll(engine) {}
}
