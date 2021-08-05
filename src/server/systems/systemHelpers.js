import Hostility from "../components/hostilityComponent.js";
import Turn from "../components/turnComponent.js";

export function turnsInProgress(entities) {
  var turnsInProgress = entities
    .map((x) => x.getComponentByType(Turn)?.TurnEnded)
    .filter((x) => x != null)
    .some((x) => x == false);
  return turnsInProgress;
}

export function getAllHostileEntities(entity, entities) {
  return entities.filter((x) => isHostile(x, entity));
}

export function isHostile(entity1, entity2) {
  var e1hostility = entity1?.getComponentByType(Hostility);
  var e2hostility = entity2?.getComponentByType(Hostility);
  return e1hostility?.Team === e2hostility?.Team;
}
