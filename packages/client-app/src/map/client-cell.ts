import P5 from 'p5';

import { SharedConfig } from '../shared';
import { ClientPlayer } from '../elements';
import ElementTypeEnum from '../elements/element-type-enum';
import { Position, RGB } from '../shared/utils';
import { AbstractElement, Cell } from '../shared/elements';

class ClientCell extends Cell {
  private p5: P5;

  constructor(element: AbstractElement, centerPosition: Position, p5: P5) {
    super(element, centerPosition);
    this.p5 = p5;
  }

  public draw() {
    this.p5.stroke(0);
    this.p5.strokeWeight(1);
    const { r, g, b } = this.rgb;
    this.p5.fill(r, g, b);
    this.p5.square(this.x1, this.y1, SharedConfig.GRID_SIZE);
  }

  public set(
    {
      centerPosition, element, rgb, x1, x2, y1, y2,
    }: Cell,
    player: ClientPlayer,
  ): void {
    this.centerPosition = centerPosition;
    this.rgb = rgb;
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;

    if (element === null) {
      this.element = null;
    } else {
      switch (element.type) {
        case ElementTypeEnum.PLAYER:
          this.element = player;
          break;
        default:
          this.element = element;
          break;
      }
    }
  }
}

export default ClientCell;
