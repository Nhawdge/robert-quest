export function AngleBetweenPoints(point1, point2) {
  var diff = point1.X - point2.X;
  var diffy = point1.Y - point2.Y;
  return (Math.atan2(diffy, diff) * 180) / Math.PI;
}

export class Rect {
  constructor(height, width, position) {
    this.Height = height;
    this.Width = width;
    this.Position = position;
  }
}

export class Polygon {
  constructor(points) {
    this.Points = points ?? [];
  }
}
