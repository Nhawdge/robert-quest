import Component from "./component.js";

export default class AttributeComponent extends Component {
  BaseAttributes = {
    Strength: 10,
    Intelligence: 10,
    Dexterity: 10,
  };

  constructor() {
    super();

    this.Strength = 10;
    this.Intelligence = 10;
    this.Dexterity = 10;
  }

  displayForPlayer() {
    return `Strength ${this.Strength} | Intelligence: ${this.Intelligence} | Dexterity: ${this.Dexterity}`;
  }
}
