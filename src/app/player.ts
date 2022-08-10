import Position from './position';

class Player {
  mousePosition: Position;

  position: Position;

  constructor(position: Position) {
    this.position = position;
    this.mousePosition = new Position(0, 0);
  }

  public getMousePosition(): Position {
    return this.getMousePosition();
  }
}

export default Player;
