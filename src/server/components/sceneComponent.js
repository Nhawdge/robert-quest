import Component from "./component.js";

const Scenes = {
  Start: 1,
  Town:2,
  Combat:3,
}

export default class Scene extends Component {
  constructor() {
    super();
    this.ActiveScene = "Character Creation";
  }
  displayForPlayer() {
    return   { displayZone: "character", data:  `Active Scene: ${this.ActiveScene}`};
  }
}
