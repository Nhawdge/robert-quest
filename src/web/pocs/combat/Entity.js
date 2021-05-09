import IdFactory from "./IdFactory.js";

export default class Entity {
  Id = "";
  Health = 10;
  MaxHealth = 10;
  Shield = 0;
  Energy = 2;
  MaxEnergy = 2;
  Strength = 1;

  Target = null;
  Name = "";
  RenderParent = "";
  Actions = [];

  constructor(name, stats) {
    this.Id = IdFactory.NextId();
    this.Name = name;
    this.Health ??= stats?.Health;
    this.Strength ??= stats?.Strength;
    this.Shield ??= stats?.Shield;
    console.log(this.Id);
  }

  Render() {
    var container = document.createElement("div");
    container.dataset.id = this.Id;
    container.classList.add(this.constructor.name);
    var name = document.createElement("strong");
    name.textContent = this.Name;
    container.appendChild(name);

    var healthBar = document.createElement("meter");
    healthBar.max = this.MaxHealth;
    healthBar.value = this.Health;
    healthBar.min = 0;
    healthBar.low = this.MaxHealth / 4;
    container.appendChild(healthBar);

    var energyBar = document.createElement("meter");
    energyBar.max = this.MaxEnergy;
    energyBar.value = this.Energy;
    energyBar.min = 0;

    container.appendChild(energyBar);
    //return container;

    // container.addEventListener("click", (evt) => {
    //   document
    //     .querySelectorAll(".selected")
    //     .forEach((x) => x.classList.remove("selected"));
    //   container.classList.toggle("selected");
    //   console.log(this.Name);
    // });

    document.querySelector(this.RenderParent).appendChild(container);
  }

  UpdateHealth(adjustment) {
    var blockedAdjustment = adjustment + this.Shield;
    if (adjustment + this.Shield > 0) {
      blockedAdjustment = 0;
    }
    this.Health += blockedAdjustment;

    console.log(
      `${this.DomId} was hit for ${adjustment}, and blocked ${this.Shield}. Current Health is: ${this.Health}`
    );
    if (this.Health <= 0) {
      document.querySelector(`#${this.DomId}`).remove();
    }
    this.Shield = 0;
  }

  Attack = () => {
    this.Energy--;
    var hit = Math.floor(Math.random() * this.Strength);
    this.Target.UpdateHealth(-hit);
  };

  Defend = () => {
    this.Shield += Math.floor(Math.random() * (2 * this.Strength));
    console.log("Defending ", this);
  };

  SelectTarget = (evt) => {
    var tar = evt.target;
    if (!tar.classList.contains("Enemy")) {
      tar = tar.parentElement;
    }
    document
      .querySelectorAll(".selected")
      .forEach((x) => x.classList.remove("selected"));
    tar.classList.add("selected");
    console.log(tar.id);
    this.Target = enemies.find((x) => x.DomId == tar.id);
  };
}
