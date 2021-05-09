import Entity from "./Entity.js";
import Action from "./Action.js";

export default class Player extends Entity {
  RenderParent = "#player";
  Actions = [
    new Action("Attack", {
      action: (target) => {
        console.log("Attack", target);
      },
    }),
    new Action("Defend", {
      action: (target) => {
        console.log("Defending");
      },
    }),
  ];

  Render() {
    super.Render();
    var container = document.createElement("div");
    container.classList.add("moves");
    this.Actions.forEach((x) => {
      var button = document.createElement("button");
      button.textContent = x.Name;
      button.addEventListener("click", x.Action);
      container.appendChild(button);
    });
    document.querySelector(this.RenderParent).appendChild(container);
  }
}
