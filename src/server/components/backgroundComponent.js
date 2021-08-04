import Component from "./component.js";

const BackgroundData = {
  Squire: { Strength: 1 },
  Farmer: { Strength: 1 },
  Banker: { Intelligence: 1 },
  Clergy: { Intelligence: 1 },
  Orphan: { Dexterity: 1 },
  Pickpocket: { Dexterity: 1 },
};

export default class Background extends Component {
  constructor(name) {
    super();

    this.Name = name || "None";
    this.Modifiers = BackgroundData[this.Name] || {};
  }
  displayForPlayer() {
    return `Background: ${this.Name}`;
  }
}
