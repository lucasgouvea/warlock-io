import Config from '../../config';
import { Element } from '../elements';
import Position from '../position';
import { Projectile } from '../projectiles';
import RGB from '../utils/rgb';

class Cell {
  private centerPosition: Position;

  private element: Element | null;

  private rgb: RGB;

  public x1: number;

  public x2: number;

  public y1: number;

  public y2: number;

  constructor(element: Element | null, centerPosition: Position) {
    this.centerPosition = centerPosition;
    this.element = element;
    this.rgb = new RGB(0, 0, 0);
    this.x1 = centerPosition.x - Config.GRID_SIZE / 2;
    this.x2 = centerPosition.x + Config.GRID_SIZE / 2;
    this.y1 = centerPosition.y - Config.GRID_SIZE / 2;
    this.y2 = centerPosition.y + Config.GRID_SIZE / 2;
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
    if (element !== null) {
      this.rgb = new RGB(125, 222, 45);
    } else {
      this.rgb = new RGB(0, 0, 0);
    }
    this.element = element;
  }

  public getElement(): Element | null {
    return this.element;
  }
}

export default Cell;