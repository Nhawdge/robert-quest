import Vector2 from "../Vector.js";

export default class Render {
  constructor(sprite) {
    this.Position = new Vector2();
    this.Sprite = this.LoadSprite(sprite);
    this.Height = 0;
    this.Width = 0;
  }
  LoadSprite(sprite) {
    var img = new Image();
    img.src = `/assets/${sprite}.png`;
    img.onload = () => {
      this.Height = img.height;
      this.Width = img.width;
    };

    return img;
  }
}
