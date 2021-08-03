import Component from "./component.js";

export default class TurnComponent extends Component {
  constructor() {
    this.TurnEnded = false;
  }
  displayForPlayer() {
    return `Turn: ${this.turnEnded ? "Done" : "In Progress"}`;
  }
}
