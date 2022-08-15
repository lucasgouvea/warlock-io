import P5 from 'p5';

import ClientPosition from '../utils/client-position';
import Element from './element';
import ElementTypeEnum from './element-type-enum';

class Enemy extends Element {
  readonly type = ElementTypeEnum.ENEMY;

  private p5: P5;

  private hp: number;

  constructor(position: ClientPosition, p5: P5) {
    super(position);
    this.p5 = p5;
    this.hp = 10;
  }

  public draw() {
    this.p5.stroke(0);
    this.p5.strokeWeight(1);
    const { x, y } = this.position;
    this.p5.circle(x, y, 42);
  }
}

export default Enemy;
