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

    this.Name = name;
    this.Modifiers = BackgroundData[this.Name] || {};
  }
  displayForPlayer(isPlayer) {
    var output = [];
    if (isPlayer && !this.Name) {
      var backgrounds = Object.keys(BackgroundData)
        .map((x) => `<button data-background="${x}">${x}</button>`)
        .join(" ");
      output.push(
        `<fieldset><legend>Pick a Background</legend>${backgrounds}</fieldset>`
      );
    } else {
      output.push(`Background: ${this.Name}`);
    }

    return { displayZone: "character", data: output.join(" ") };
  }
}
