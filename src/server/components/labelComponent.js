import Component from "./component.js";

export default class Label extends Component {
  constructor(name) {
    super();

    this.Name = name;
    this.DisplayLocation;
    this.NameSet = this.Name != "Player";
  }

  displayForPlayer(isPlayer) {
    if (isPlayer && !this.NameSet) {
      return `<fieldset>
      <legend>Name</legend>
      <input type="text" name="name" />
    </fieldset>`;
    }
    return `Name: ${this.Name}`;
  }
}
