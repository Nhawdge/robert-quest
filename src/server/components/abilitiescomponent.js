import Component from "./component.js";

export default class Abilities extends Component {
  constructor() {
    super();

    this.Abilities = ["Attack", "Defend", "Heal"];
  }
  displayForPlayer(isPlayer) {
    var output = [];
    if (isPlayer) {
      var actions = this.Abilities.map(
        (x) => `<button data-action="${x}">${x}</button>`
      ).join(" ");
      var endTurn = `<button data-turn="end">End Turn</button>`;
      output.push(
        `<fieldset><legend>Actions</legend>${actions}${endTurn}</fieldset>`
      );
    }
    return output.join(" ");
  }
}
