import Position from '../position';
import Element from './element';
import ElementTypeEnum from './element-type-enum';

class Enemy extends Element {
  readonly type = ElementTypeEnum.ENEMY;

  private p5: p5;

  private hp: number;

  constructor(position: Position, p5: p5) {
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
