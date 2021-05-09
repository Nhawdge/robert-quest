export default class IdFactory {
  static CurrentId = 0;
  static NextId() {
    this.CurrentId++;
    return this.CurrentId;
  }
}
