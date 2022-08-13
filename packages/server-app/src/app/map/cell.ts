import Config from '../config';
import { Element } from '../elements';
import Position from '../position';
import { Projectile } from '../projectiles';

class Cell {
  public centerPosition: Position;

  public x1: number;

  public x2: number;

  public y1: number;

  public y2: number;


  private element: Element | null;

  constructor(element: Element | null, centerPosition: Position) {
    this.centerPosition = centerPosition;
    this.x1 = centerPosition.x - Config.GRID_SIZE / 2;
    this.x2 = centerPosition.x + Config.GRID_SIZE / 2;
    this.y1 = centerPosition.y - Config.GRID_SIZE / 2;
    this.y2 = centerPosition.y + Config.GRID_SIZE / 2;

    this.element = element;
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
