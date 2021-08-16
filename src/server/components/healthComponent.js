import Component from "./component.js";

export default class HealthComponent extends Component {
  constructor(max) {
    super();

    this.Max = max || 10;
    this.CurrentHealth = this.Max;
    this.RegenerationRate = 1;
  }
  displayForPlayer(isPlayer) {
    return {
      displayZone: isPlayer ? "character" : "combat",
      data: `Health: ${this.CurrentHealth} / ${this.Max} | Regen: ${this.RegenerationRate} / turn`,
    };
  }
}
