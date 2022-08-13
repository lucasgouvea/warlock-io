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

  public draw(projectiles: Projectile[]) {
    if (this.element === null) {
      this.p5.fill(255, 255, 255);
    } else {
      this.p5.fill(122, 204, 15);
    }

    for (const projectil of projectiles) {
      if (this.isInside(projectil)) {
        this.p5.fill(122, 204, 15);
        if (this.element?.type === ElementTypeEnum.ENEMY) {
          console.log(1111);
        }
      }
    }
    this.p5.stroke(122);
    this.p5.square(this.x1, this.y1, Config.GRID_SIZE);
  }

  public isInside(projectil: Projectile) {
    const { x, y } = projectil.getPosition();

    if (
      this.x2 - x > 0
      && this.y2 - y > 0
      && this.x1 - x < 0
      && this.y1 - y < 0
    ) {
      return true;
    }
    return false;
  }

  public setElement(element: Element | null): void {
    this.element = element;
  }

  public getElement(): Element | null {
    return this.element;
  }
}

export default Cell;
