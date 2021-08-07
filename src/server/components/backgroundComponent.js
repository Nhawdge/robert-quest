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
  displayForPlayer() {
    if (this.Name) {
      return `Background: ${this.Name}`;
    } else {
      var keys = Object.keys(BackgroundData);
      return keys
        .map((key) => {
          var button = `<button data-background="${key}" >${key}</button>`;
          return button;
        })
        .join(" ");
    }
  }
}
