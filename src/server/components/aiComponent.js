import Component from "./component.js";

export default class AiComponent extends Component {
  constructor() {
    super();
    this.Attitude = "Aggressive";
    this.BaseLevel = 1;
  }
  displayForPlayer() {
    return `Attitude: ${this.Attitude}  `;
  }
}
