import Controls from "../Components/Controls.js";
import Render from "../Components/Render.js";
import Vector2 from "../Vector.js";

export default class ControlSystem {
  constructor() {
    this.KeysPressed = new Set();
    this.MousePosition = new Vector2();
    this.Engine = null;
  }

  Load(engine) {
    this.Engine = engine;
    this.KeyDown = document.addEventListener("keydown", this.KeyDown.bind(this));
    this.KeyUp = document.addEventListener("keyup", this.KeyUp.bind(this));
    this.Mousemove = document.addEventListener("mousemove", this.Mousemove.bind(this));

    console.log("ControlSystem loaded");
  }

  KeyDown(event) {
    this.KeysPressed.add(event.key);
  }

  KeyUp(event) {
    this.KeysPressed.delete(event.key);
  }
  Mousemove(e) {
    var rect = this.Engine.Canvas.getBoundingClientRect();
    this.MousePosition = new Vector2(e.clientX - rect.top, e.clientY - rect.left);
  }

  UpdateAll(engine) {
    var Speed = 5;

    engine.Entities.forEach((entity) => {
      var controls = entity.GetComponent(Controls);
      
      if (controls) {
        var myRender = entity.GetComponent(Render);
        if (this.KeysPressed.has("a")) {
          myRender.Position.X -= 1 * Speed;
        }
        if (this.KeysPressed.has("d")) {
          myRender.Position.X += 1 * Speed;
        }
        if (this.KeysPressed.has("w")) {
          myRender.Position.Y -= 1 * Speed;
        }
        if (this.KeysPressed.has("s")) {
          myRender.Position.Y += 1 * Speed;
        }

        controls.MousePosition = this.MousePosition;
      }
    });
  }
}
