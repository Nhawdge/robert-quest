import Component from "./component.js";

export default class Label extends Component {
  constructor(name) {
    super();

    this.Name = name;
  }

  displayForPlayer() {
    return `${this.Name}`;
  }
}
