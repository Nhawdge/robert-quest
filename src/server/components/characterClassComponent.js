import Component from "./component.js";

const ClassData = {
  Warrior: {
    Strength: 5,
    Intelligence: 2,
    Dexterity: 3,
  },
  Paladin: {
    Strength: 4,
    Intelligence: 4,
    Dexterity: 2,
  },
  Cleric: {
    Strength: 2,
    Intelligence: 6,
    Dexterity: 2,
  },
  Priest: {
    Strength: 2,
    Intelligence: 6,
    Dexterity: 2,
  },
  Mage: {
    Strength: 2,
    Intelligence: 6,
    Dexterity: 2,
  },
  Archer: {
    Strength: 2,
    Intelligence: 2,
    Dexterity: 6,
  },
  Barbarian: {
    Strength: 6,
    Intelligence: 2,
    Dexterity: 2,
  },
  Rogue: {
    Strength: 2,
    Intelligence: 2,
    Dexterity: 6,
  },
};

export default class CharacterClass extends Component {
  constructor(name) {
    super();

    this.Name = name ?? "None";
    this.Modifiers = ClassData[this.Name] ?? {};
  }
  displayForPlayer() {
    return `Class: ${this.Name}`;
  }
}
