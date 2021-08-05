import Component from "./component.js";

export default class AttributeComponent extends Component {
  BaseAttributes = {
    Strength: 1,
    Intelligence: 1,
    Dexterity: 1,
  };

  constructor() {
    super();

    this.Strength = 1;
    this.Intelligence = 1;
    this.Dexterity = 1;
    this.MeleeMin = 0;
    this.MeleeMax = 1;
  }

  displayForPlayer() {
    return `Strength ${this.Strength} | Intelligence: ${this.Intelligence} | Dexterity: ${this.Dexterity} | Melee: ${this.MeleeMin} - ${this.MeleeMax}`;
  }
}
