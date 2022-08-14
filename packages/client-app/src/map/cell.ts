import P5 from 'p5';

import Config from '../config';
import { Element } from '../elements';
import ElementTypeEnum from '../elements/element-type-enum';
import Position from '../position';
import { Projectile } from '../projectiles';

class Cell {
  public centerPosition: Position;

  public x1: number;

  public x2: number;

  public y1: number;

  public y2: number;

  private p5: P5;

  private element: Element | null;

  constructor(element: Element | null, centerPosition: Position, p5: P5) {
    this.centerPosition = centerPosition;
    this.x1 = centerPosition.x - Config.GRID_SIZE / 2;
    this.x2 = centerPosition.x + Config.GRID_SIZE / 2;
    this.y1 = centerPosition.y - Config.GRID_SIZE / 2;
    this.y2 = centerPosition.y + Config.GRID_SIZE / 2;
    this.p5 = p5;

    this.element = element;
  }

  public draw() {
    if (this.element === null) {
      this.p5.fill(255, 255, 255);
    } else {
      this.p5.fill(122, 204, 15);
    }

    this.p5.stroke(122);
    this.p5.square(this.x1, this.y1, Config.GRID_SIZE);
  }

  public set({
    centerPosition,
    element,
    x1,
    x2,
    y1,
    y2,
  }: Cell): void {
    this.centerPosition = centerPosition;
    this.element = element;
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
  }
}

export default Cell;
