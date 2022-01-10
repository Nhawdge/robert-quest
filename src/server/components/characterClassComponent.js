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

    this.Name = name;
    this.Modifiers = ClassData[this.Name] ?? {};
  }
  displayForPlayer(isPlayer) {
    var output = [];
    if (isPlayer && !this.Name) {
      var fields = Object.keys(ClassData)
        .map((x) => `<button data-class="${x}">${x}</button>`)
        .join(" ");
      output.push(
        `<fieldset><legend>Pick a Class</legend> ${fields}</fieldset>`
      );
    } else {
      output.push(`Class: ${this.Name}`);
    }
    return {
      displayZone: isPlayer ? "character" : "combat",
      data: output.join(" "),
    };
  }
}
