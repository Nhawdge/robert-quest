import Component from "./component.js";

export default class Turn extends Component {
  constructor() {
    super();

    this.TurnEnded = false;
  }
  displayForPlayer() {
    if (this.TurnEnded) {
      return `<span style="background-color:green; padding:2px; margin:1px"> Turn Complete</span>`;
    } else {
      return `<span style="background-color:red; padding:2px; margin:1px"> Turn In Progress</span>`;
    }
  }
}
