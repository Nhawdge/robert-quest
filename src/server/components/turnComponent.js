import Component from "./component.js";

export default class Turn extends Component {
  constructor() {
    super();

    this.TurnEnded = false;
  }
  displayForPlayer() {
    return `Turn: ${this.TurnEnded ? "Done" : "In Progress"}`;
  }
}
