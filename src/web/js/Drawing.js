export function AngleBetweenPoints(point1, point2) {
  var diff = (point1.X -= point2.X);
  var diffy = (point1.Y -= point2.Y);
  return (Math.atan2(diffy, diff) * 180) / Math.PI;
}
