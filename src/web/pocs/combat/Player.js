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

    setTimeout(() => {
      document
        .querySelectorAll(".Enemy")
        .forEach((x) => x.addEventListener("click", this.SelectTarget));
    }, 1000);
  }

  SelectTarget = (evt) => {
    var tar = evt.target;
    if (!tar.classList.contains("Enemy")) {
      tar = tar.parentElement;
    }
    document
      .querySelectorAll(".selected")
      .forEach((x) => x.classList.remove("selected"));
    tar.classList.add("selected");
    console.log(tar.dataset);
    this.Target = AllEntities.find((x) => x.Id == tar.dataset.id);
  };
}
