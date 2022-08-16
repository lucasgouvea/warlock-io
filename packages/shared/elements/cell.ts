import SharedConfig from '../shared-config';
import AbstractElement from './abstract-element';
import { Position, RGB } from '../utils';

class Cell {
  public centerPosition: Position;

  public element: AbstractElement | null;

  public rgb: RGB;

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

  public setElement(element: AbstractElement | null): void {
    if (element !== null) {
      this.rgb = new RGB(176, 190, 247);
    } else {
      this.rgb = new RGB(255, 255, 255);
    }
    this.element = element;
  }
}

export default Cell;
