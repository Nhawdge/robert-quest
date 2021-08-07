import Component from "./component.js";

export default class Abilities extends Component {
  constructor() {
    super();

    this.Abilities = [];
  }
  displayForPlayer() {
    var actions = ` <fieldset> 
    <legend>Actions</legend>
    </fieldset>
    
    `;
    return actions;
  }
}
