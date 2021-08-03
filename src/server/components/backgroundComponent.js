import Component from "./component.js";

export default class Background extends Component {
  constructor(name) {
    super();

    this.Name = name || "None";
  }
  displayForPlayer() {
    return `Background: ${this.Name}`;
  }
}
