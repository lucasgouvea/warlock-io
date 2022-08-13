
import Position from '../position';
import { Element } from '../elements';
import Cell from './cell';
import Config from '../config';

class PositionsMap {
  private map: Map<string, Cell>;


  constructor(width: number, height: number, gridSize: number) {
    this.map = new Map();
    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
        const centerX = x + Config.GRID_SIZE / 2;
        const centerY = y + Config.GRID_SIZE / 2;
        this.init(new Position(centerX, centerY));
      }
    }
  }

  public init(position: Position): void {
    this.map.set(`${position.x},${position.y}`, new Cell(null, position));
  }

  public clear({ x, y }: Position): void {
    const cell = this.map.get(`${x},${y}`);
    if (cell) {
      cell.setElement(null);
    }
  }

  public set(element: Element): void {
    const { x, y } = element.getPosition();
    const cell = this.map.get(`${x},${y}`);
    if (cell) {
      cell.setElement(element);
    }
  }

  public get({ x, y }: Position): Element | null {
    const cell = this.map.get(`${x},${y}`);
    if (cell) {
      return cell.getElement();
    }
    return null;
  }

  public getMap(): Map<string, Cell> {
    return this.map;
  }
}

export default PositionsMap;
