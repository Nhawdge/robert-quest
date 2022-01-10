export default class Entity {
  constructor() {
    this.Id = Math.floor(Math.random() * 100000);
    this.Components = [];
  }
  
  GetComponent(componentType) {
    var existingComponent = this.Components.find(
      (x) => componentType.name == x.constructor.name
    );

    return existingComponent;
  }
}
