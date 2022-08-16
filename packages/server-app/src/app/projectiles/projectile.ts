import { Position, UnitVector } from '../../shared/utils';

abstract class Projectile {
  public angleRadians: number;

  public position: Position;

  public unitVector: UnitVector;

  constructor(
    position: Position,
    angleRadians: number,
    unitVector: UnitVector,
  ) {
    this.position = position || new Position(0, 0);
    this.angleRadians = angleRadians;
    this.unitVector = unitVector;
  }

  public getPosition(): Position {
    return this.position;
  }
}

export default Projectile;
