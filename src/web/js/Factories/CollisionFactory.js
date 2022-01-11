import CollidableBody from "../Components/CollidableBody.js";

export function IsCollidable(entity) {
  return entity.GetComponent(CollidableBody) != null;
}
