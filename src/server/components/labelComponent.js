import Component from "./component.js";

export default class Label extends Component {
  constructor(name) {
    super();

    this.Name = name;
    this.NameSet = this.Name != "Player";
    this.LogData = [];
  }

  displayForPlayer(isPlayer) {
    if (isPlayer && !this.NameSet) {
      return {
        displayZone: "character",
        data: `<fieldset>
        <legend>Name</legend>
        <input type="text" name="name" />
        </fieldset>`,
      };
    }
    return {
      displayZone: isPlayer ? "character" : "combat",
      data: [`Name: ${this.Name}`, ...this.LogData].join("<br>"),
    };
  }
}
