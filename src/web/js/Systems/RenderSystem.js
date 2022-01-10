import Render from "../Components/Render.js";
import Controls from "../Components/Controls.js";
import { AngleBetweenPoints } from "../Drawing.js";

export default class RenderSystem {
  Load() {
    console.log("RenderSystem loaded");
  }
  UpdateAll(engine) {
    var ctx = engine.Context;
    ctx.clearRect(0, 0, engine.Canvas.width, engine.Canvas.height);

    engine.Entities.forEach((entity) => {
      var myRender = entity.GetComponent(Render);
      var myControls = entity.GetComponent(Controls);
      if (myRender) {
        ctx.drawImage(myRender.Sprite, myRender.Position.X, myRender.Position.Y);
        if (myControls) {
          var angle = AngleBetweenPoints(myRender.Position, myControls.MousePosition);

          //ctx.beginPath();
          //ctx.moveTo(myRender.Position.X, myRender.Position.Y);
          //ctx.lineTo(myRender.Position.X + Math.cos(angle) * 50, myRender.Position.Y + Math.sin(angle) - 50);
          //ctx.lineTo(myRender.Position.X + Math.cos(angle) * (1 / 50), myRender.Position.Y + Math.sin(angle) + 50);
          //ctx.lineTo(myRender.Position.X, myRender.Position.Y);
          //ctx.closePath();
          //ctx.fill();

          // Draw line to mouse
          ctx.beginPath();
          ctx.moveTo(myRender.Position.X + myRender.Width / 2, myRender.Position.Y + myRender.Height / 2);
          ctx.lineTo(myControls.MousePosition.X, myControls.MousePosition.Y);
          ctx.stroke();
        }
      }
    });
  }
}
