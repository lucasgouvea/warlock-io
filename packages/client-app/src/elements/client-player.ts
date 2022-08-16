import P5 from 'p5';

import { Position, RightTriangle, UnitVector } from '../shared/utils';
import { AbstractPlayer } from '../shared/elements';
import { Ball } from '../projectiles';
import Element from './element';
import ElementTypeEnum from './element-type-enum';

class ClientPlayer extends AbstractPlayer {
  private p5: P5;

  constructor(position: Position, p5: P5) {
    super(position);
    this.p5 = p5;
  }

  public draw() {
    const { x, y } = this.position;
    const { x: xMouse, y: yMouse } = this.mousePosition;
    const { x: x1, y: y1 } = this.stick.position.start;
    const { x: x2, y: y2 } = this.stick.position.end;
    this.p5.circle(x, y, 42);
    this.p5.circle(xMouse, yMouse, this.CIRCLE_RADIUS * 2);
    this.p5.line(x1, y1, x2, y2);
  }
}

export default ClientPlayer;
