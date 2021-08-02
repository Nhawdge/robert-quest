class Map {
  Entry = new Room();

  generate() {
    this.Entry.generate(0);
  }
  toSvg() {
    var start = this.Entry;
  }
}

class Room {
  doors = [];

  generate(depth) {
    var random = Math.ceil((Math.random() * 100) % 4) - depth;
    for (let i = 0; i < random; i++) {
      var nextRoom = new Room();
      nextRoom.generate(depth + 1);
      this.doors.push(nextRoom);
    }
  }
}

var map = new Map();

map.generate();

console.log(map);
