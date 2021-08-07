import Component from "./component.js";

const Scenes = {
  CharacterCreation: "Character Creation",
  Town: "Town",
  Combat: "Combat",
};

export default class Scene extends Component {
  constructor() {
    super();
    this.ActiveScene = Scenes.CharacterCreation;
  }
  displayForPlayer() {
    return `Active Scene: ${this.ActiveScene}`;
  }
}
