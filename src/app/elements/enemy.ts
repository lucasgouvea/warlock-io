import Position from '../position';
import Element from './element';

class Enemy extends Element {
  private p5: p5;

  constructor(position: Position, p5: p5) {
    super(position);
    this.p5 = p5;
  }

  public draw() {
    this.p5.stroke(0);
    this.p5.strokeWeight(1);
    const { x, y } = this.position;
    this.p5.circle(x, y, 42);
  }
}

export default Enemy;
