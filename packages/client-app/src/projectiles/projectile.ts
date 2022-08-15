import P5 from 'p5';

import ClientPosition from '../utils/client-position';
import { UnitVector } from '../utils';

abstract class Projectile {
  public angleRadians: number;

  public position: ClientPosition;

  protected p5: P5;

  public unitVector: UnitVector;

  abstract draw(): void;

  constructor(
    position: ClientPosition,
    angleRadians: number,
    unitVector: UnitVector,
    p5: P5,
  ) {
    this.position = position || new ClientPosition(0, 0);
    this.angleRadians = angleRadians;
    this.unitVector = unitVector;
    this.p5 = p5;
  }

  public getPosition(): ClientPosition {
    return this.position;
  }
}

export default Projectile;
