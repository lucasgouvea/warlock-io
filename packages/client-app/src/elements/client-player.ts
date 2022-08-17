import P5 from 'p5';

import { Position } from '../shared/utils';
import { AbstractPlayer } from '../shared/elements';

class ClientPlayer extends AbstractPlayer {
  private p5: P5;

  constructor(position: Position, p5: P5) {
    super(position);
    this.p5 = p5;
  }

  public draw() {
    const { x, y } = this.position;
    const { x: x1, y: y1 } = this.stick.position.start;
    const { x: x2, y: y2 } = this.stick.position.end;

    this.p5.strokeWeight(1);
    this.p5.circle(x, y, 42);
    this.p5.strokeWeight(5);
    this.p5.line(x1, y1, x2, y2);
  }
}

export default ClientPlayer;
