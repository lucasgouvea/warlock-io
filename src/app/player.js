import Position from './position.js';

class Player {
  mousePosition;

  position;

  constructor(position) {
    this.position = position;
    this.mousePosition = new Position(0, 0);
  }
}

export default Player;
