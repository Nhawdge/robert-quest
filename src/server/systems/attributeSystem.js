import AiComponent from "../components/aiComponent.js";
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

    var ai = entity.getComponentByType(AiComponent);
    if (ai) {
      updatedAttributes.Strength = ai.BaseLevel * 3;
      updatedAttributes.Intelligence = ai.BaseLevel * 3;
      updatedAttributes.Dexterity = ai.BaseLevel * 3;
    }

    updatedAttributes.MeleeMin = Math.floor(updatedAttributes.Strength * 1);
    updatedAttributes.MeleeMax = Math.floor(updatedAttributes.Strength * 1.5);

    entity.addOrUpdateComponent(updatedAttributes);
  }
  TickAll() {}
}
