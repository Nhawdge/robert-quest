import Component from "./component.js";

export default class Action extends Component {
  TargetName = "";
  Act;
  //Act
  constructor(TargetId) {
    super();

    if (TargetId) {
      this.TargetId = TargetId;
      this.Act = null;
    }
  }

  displayForPlayer(isPlayer) {
    return {
      displayZone: isPlayer ? "actions" : "combat",
      data: `${this.Act || "Target"}ing ${this.TargetName}`,
    };
  }
}
