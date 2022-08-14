import P5 from 'p5';

import Position from '../position';
import { Player } from '../elements';
import Cell from './cell';
import Config from '../config';

class PositionsMap {
  private map: Map<string, Cell>;

  private p5: P5;

  constructor(p5: P5) {
    this.map = new Map();
    this.p5 = p5;
    for (let x = 0; x < Config.CANVAS_WIDTH; x += Config.GRID_SIZE) {
      for (let y = 0; y < Config.CANVAS_HEIGHT; y += Config.GRID_SIZE) {
        const centerX = x + Config.GRID_SIZE / 2;
        const centerY = y + Config.GRID_SIZE / 2;
        this.init(new Position(centerX, centerY));
      }
    }
  }

  public init(position: Position): void {
    this.map.set(
      `${position.x},${position.y}`,
      new Cell(null, position, this.p5),
    );
  }

  public parseMap(event: MessageEvent<string>, player: Player): void {
    const object = JSON.parse(event.data) as object;
    for (const [key, _cell] of Object.entries(object)) {
      const cell = this.map.get(key);
      cell.set(_cell, player);
    }
  }

  public getMap(): Map<string, Cell> {
    return this.map;
  }
}

export default PositionsMap;
