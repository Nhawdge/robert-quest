import Render from "../Components/Render.js";
import Controls from "../Components/Controls.js";
import { AngleBetweenPoints } from "../Drawing.js";
import Vector2 from "../Vector.js";

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
          var center = new Vector2(myRender.Position.X + myRender.Width / 2, myRender.Position.Y + myRender.Height / 2);
          var angle = AngleBetweenPoints(center, myControls.MousePosition);
          var angleInRadians = angle * (Math.PI / 180);

          var distance = 200;
          var data = {
            center,
            angle,
            angleInRadians,
            pos1: { x: center.X + Math.cos(angleInRadians + 10) * distance, y: center.Y + Math.sin(angleInRadians + 10) * distance },
            pos2: { x: center.X + Math.cos(angleInRadians - 10) * distance, y: center.Y + Math.sin(angleInRadians - 10) * distance },
          };
          console.log(data);

          ctx.fillStyle = "green";
          ctx.beginPath();
          ctx.moveTo(center.X, center.Y);
          ctx.lineTo(data.pos1.x, data.pos1.y);
          ctx.lineTo(data.pos2.x, data.pos2.y);

          ctx.closePath();
          ctx.fill();
          // Draw line to mouse
          ctx.beginPath();
          ctx.moveTo(center.X, center.Y);
          ctx.lineTo(myControls.MousePosition.X, myControls.MousePosition.Y);
          ctx.stroke();
        }
      }
    });
  }
}
