import Player from "./Player.js";
import Enemy from "./Enemy.js";

export default class CombatEngine {
  CombatInProgress = true;
  AllEntities = [];

  constructor() {
    this.Load();
  }

  Load() {
    this.AllEntities = [
      new Player("You"),
      new Enemy("Ogre"),
      new Enemy("Lizard"),
      new Enemy("Bear"),
    ];
  }

  Startup() {
    //while (this.CombatInProgress) {
    this.Loop();
    if (this.AllEntities.filter((x) => x instanceof Enemy).length == 0) {
      this.CombatInProgress = false;
    }
    //}
    this.End();
  }

  Loop() {
    this.AllEntities.forEach((x) => x.Render());
  }

  End() {}
}
