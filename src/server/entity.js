export default class Entity {
  constructor(id) {
    this.components = [];
    this.id = id || Math.random().toString().substr(2);
  }

  addOrUpdateComponent(component) {
    var existingComponent = this.components.find(
      (x) => component.constructor.name == x.constructor.name
    );

    if (!existingComponent) {
      this.components.push(component);
    } else {
      Object.keys(component).forEach((x) => {
        if (component[x] != null) {
          existingComponent[x] = component[x];
        }
      });
    }
  }

  getComponentByType(componentType) {
    var existingComponent = this.components.find(
      (x) => componentType.name == x.constructor.name
    );

    return existingComponent;
  }
}
