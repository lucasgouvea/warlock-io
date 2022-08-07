import Position from './position.js';

class PositionsMap {
  map;

  constructor(width, height, gridSize) {
    this.map = new Map();
    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
        this.set(new Position(x, y), null);
      }
    }
  }

  set(position, player) {
    this.map.set(`${position.x},${position.y}`, player);
  }

  get({ x, y }) {
    const position = this.map.get(`${x},${y}`);
    if (position === undefined) {
      throw new Error(`Invalid posiiton access: ${position}`);
    }
    return position;
  }
}

export default PositionsMap;
