import Component from "./component.js";

export default class AiComponent extends Component {
  constructor(baseLevel) {
    super();
    this.Attitude = "Aggressive";
    this.BaseLevel = baseLevel;
  }
  displayForPlayer() {
    return { displayZone: "combat", data: `Attitude: ${this.Attitude}` };
  }
}
