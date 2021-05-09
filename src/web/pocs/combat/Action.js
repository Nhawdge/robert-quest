export default class Action {
  Name = "";
  Cost = 0;
  Requirements = [];
  Action = () => {
    console.log("No action");
  };

  constructor(name, props) {
    this.Name = name;
    this.Action = props?.action;
    this.Cost = props?.cost;
    this.Requirements = props?.requirements;
  }
}
