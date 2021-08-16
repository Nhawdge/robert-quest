import Component from "./component.js";

const Weapons = {
  Sword: { Strength: 2 },
  Staff: { Intelligence: 2 },
  Dagger: { Dexterity: 2 },
};
export default class Equipment extends Component {
  constructor() {
    super();

    this.Slots = {
      MainHand: "",
      Chest: "",
    };
  }
  displayForPlayer() {
    var gear = Object.keys(this.Slots).map(
      (x) => `${x}: ${this.Slots[x] || "None"}`
    );
    return { displayZone: "character", data: gear.join(" | ") };
  }
}
