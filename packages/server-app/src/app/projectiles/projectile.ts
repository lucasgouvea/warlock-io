import ServerPosition from '../utils/server-position';
import { UnitVector } from '../utils';

abstract class Projectile {
  public angleRadians: number;

  public position: ServerPosition;


  public unitVector: UnitVector;

  constructor(
    position: ServerPosition,
    angleRadians: number,
    unitVector: UnitVector,
  ) {
    this.position = position || new ServerPosition(0, 0);
    this.angleRadians = angleRadians;
    this.unitVector = unitVector;
  }

  public getPosition(): ServerPosition {
    return this.position;
  }
}

export default Projectile;
