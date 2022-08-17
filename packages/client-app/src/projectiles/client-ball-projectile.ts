import P5 from 'p5';
import { AbstractElement } from '../shared/elements';

import { BallProjectile } from '../shared/elements/projectile';
import { Position, UnitVector } from '../shared/utils';

class ClientBallProjectile extends BallProjectile {
  private p5: P5;

  constructor(
    angleRadians: number,
    originElement: AbstractElement,
    position: Position,
    unitVector: UnitVector,
    p5: P5,
  ) {
    super(angleRadians, originElement, position, unitVector);
    this.p5 = p5;
  }

  public draw(): void {
    this.p5.circle(this.position.x, this.position.y, 10);
  }
}

export default ClientBallProjectile;
