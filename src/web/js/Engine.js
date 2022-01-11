import RenderSystem from "./Systems/RenderSystem.js";
import GenerationSystem from "./Systems/GenerationSystem.js";
import ControlSystem from "./Systems/ControlSystem.js";
import TargetSystem from "./Systems/TargetSystem.js";
import CollisionSystem from "./Systems/CollisionSystem.js";

export default class Engine {
  constructor(canvas, context) {
    this.Canvas = canvas;
    this.Context = context;

    this.Entities = [];
    this.Systems = [];
  }

  Load() {
    this.Systems.push(new RenderSystem());
    this.Systems.push(new GenerationSystem());
    this.Systems.push(new ControlSystem());
    this.Systems.push(new TargetSystem());
    this.Systems.push(new CollisionSystem());

    this.Systems.forEach((x) => x.Load(this));
  }

  Loop() {
    setInterval(() => {
      this.Systems.forEach((x) => x.UpdateAll(this));
    }, 1000 / 60);
  }

  Start() {
    this.Load();
    this.Loop();
  }
}
