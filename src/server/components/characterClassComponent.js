import Component from "./component.js";

export default class CharacterClass extends Component {
  constructor(name) {
    super();

    this.Name = name ?? "None";
  }
  displayForPlayer() {
    return `Class: ${this.Name}`;
  }
}
