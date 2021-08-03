export default function updateAll(game) {
    game.updateState();
    Object.keys(game.connections).forEach((conn) => {
      console.log("Emitting Update", conn)
      game.connections[conn].emit(
        "update",
        game.entities.map((x) =>
          x.components.map((y) => y.displayForPlayer())
        )
      );
    });
  }
  