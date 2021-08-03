import Component from "./component.js";

export default class Equipment extends Component {
  constructor() {
    super();

    this.Slots = {
      MainHand: "",
      Chest: "",
    };
  }
  displayForPlayer() {
    var gear = Object.keys(this.Slots).map((x) => `${x}: ${this.Slots[x]}`);
    return gear.join("\n");
  }
}
