export default function updateAll(game) {
  game.updateState();
  Object.keys(game.connections).forEach((conn) => {
    game.connections[conn].emit(
      "update",
      game.entities.map((x) => ({
        id: x.id,
        ...x.components.map((y) => y.displayForPlayer()),
      }))
    );
  });
}
