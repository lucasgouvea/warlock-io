import P5 from 'p5';
import { Position, UnitVector } from '../shared/utils';

abstract class Projectile {
  public angleRadians: number;

  public position: Position;

  protected p5: P5;

  public unitVector: UnitVector;

  abstract draw(): void;

  constructor(
    position: Position,
    angleRadians: number,
    unitVector: UnitVector,
    p5: P5,
  ) {
    this.position = position || new Position(0, 0);
    this.angleRadians = angleRadians;
    this.unitVector = unitVector;
    this.p5 = p5;
  }

  public getPosition(): Position {
    return this.position;
  }
}

export default Projectile;
