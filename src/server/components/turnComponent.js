import Component from "./component.js";

export default class Turn extends Component {
  constructor() {
    super();

    this.TurnEnded = false;
  }
  displayForPlayer(isPlayer) {
    if (this.TurnEnded) {
      return {
        displayZone: isPlayer ? "character" : "combat",
        data: `<span style="background-color:green; padding:2px; margin:1px"> Turn Complete</span>`,
      };
    } else {
      return {
        displayZone: isPlayer ? "character" : "combat",
        data: `<span style="background-color:red; padding:2px; margin:1px"> Turn In Progress</span>`,
      };
    }
  }
}
  