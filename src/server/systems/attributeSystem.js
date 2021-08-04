import AttributeComponent from "../components/attributesComponent.js";
import Background from "../components/backgroundComponent.js";
import CharacterClass from "../components/characterClassComponent.js";
import System from "./system.js";

export default class AttributeSystem extends System {
  Tick(entity) {
    var attributes = entity.getComponentByType(AttributeComponent);
    var charClass = entity.getComponentByType(CharacterClass);
    var background = entity.getComponentByType(Background);

    if (!attributes) {
      return;
    }
    if (!charClass) {
      return;
    }

    var updatedAttributes = new AttributeComponent();

    updatedAttributes.Strength =
      attributes.BaseAttributes.Strength +
      (charClass?.Modifiers?.Strength || 0) +
      (background?.Modifiers?.Strength || 0);

    updatedAttributes.Intelligence =
      attributes.BaseAttributes.Intelligence +
      (charClass?.Modifiers.Intelligence || 0) +
      (background?.Modifiers?.Intelligence || 0);

    updatedAttributes.Dexterity =
      attributes.BaseAttributes.Dexterity +
      (charClass?.Modifiers.Dexterity || 0) +
      (background?.Modifiers?.Dexterity || 0);

    console.log(attributes.BaseAttributes.Strength, charClass?.Class);

    entity.addOrUpdateComponent(updatedAttributes);
  }
  TickAll() {}
}
