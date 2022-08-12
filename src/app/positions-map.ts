import Position from './position';
import { Element } from './elements';

class PositionsMap {
  map: Map<string, Element | null>;

  constructor(width: number, height: number, gridSize: number) {
    this.map = new Map();
    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
        this.clear(new Position(x, y));
      }
    }
  }

  public clear(position: Position): void {
    this.map.set(`${position.x},${position.y}`, null);
  }

  public set(element: Element): void {
    const { x, y } = element.getPosition();
    this.map.set(`${x},${y}`, element);
  }

  public get({ x, y }: Position): Element | null {
    const element = this.map.get(`${x},${y}`);
    return element ?? null;
  }
}

export default PositionsMap;
