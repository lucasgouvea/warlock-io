import Position from './position';
import Player from './player';

class PositionsMap {
  map: Map<string, any>;

  constructor(width: number, height: number, gridSize: number) {
    this.map = new Map();
    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
        this.set(new Position(x, y), null);
      }
    }
  }

  set(position: Position, player: Player | null) {
    this.map.set(`${position.x},${position.y}`, player);
  }

  get({ x, y }: Position) {
    const position = this.map.get(`${x},${y}`);
    return position;
  }
}

export default PositionsMap;
