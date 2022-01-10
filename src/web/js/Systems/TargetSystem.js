export default class TargetSystem {
  constructor() {}
  Load() {
    console.log("TargetSystem loaded");
  }
  UpdateAll(engine) {
    var mousePos = getMousePos(engine.Canvas, engine.Context);
    console.log(mousePos);
  }
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}
