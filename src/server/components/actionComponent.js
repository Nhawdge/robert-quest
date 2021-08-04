import Component from "./component.js";

export default class ActionComponent extends Component {
  TargetName = "";
  constructor(TargetId) {
    super();

    this.TargetId = TargetId;
  }

  displayForPlayer() {
    return `Targetting ${this.TargetName}`;
  }
}
