import { SharedConfig } from '../../shared';
import { AbstractElement } from '../../shared/elements';
import { Position, RGB } from '../../shared/utils';
import { Projectile } from '../projectiles';

class Cell {
  private centerPosition: Position;

  private element: AbstractElement | null;

  private rgb: RGB;

  public x1: number;

  public x2: number;

  public y1: number;

  public y2: number;

  constructor(element: AbstractElement | null, centerPosition: Position) {
    this.centerPosition = centerPosition;
    this.element = element;
    this.rgb = new RGB(255, 255, 255);
    this.x1 = centerPosition.x - SharedConfig.GRID_SIZE / 2;
    this.x2 = centerPosition.x + SharedConfig.GRID_SIZE / 2;
    this.y1 = centerPosition.y - SharedConfig.GRID_SIZE / 2;
    this.y2 = centerPosition.y + SharedConfig.GRID_SIZE / 2;
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

  public setElement(element: AbstractElement | null): void {
    if (element !== null) {
      this.rgb = new RGB(176, 190, 247);
    } else {
      this.rgb = new RGB(255, 255, 255);
    }
    this.element = element;
  }

  public getElement(): AbstractElement | null {
    return this.element;
  }
}

export default Cell;
