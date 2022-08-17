import { Position, UnitVector } from '../../utils';
import AbstractElement from '../abstract-element';

abstract class AbstractProjectile {
  public angleRadians: number;

  public originElement: AbstractElement;

  public position: Position;

  public unitVector: UnitVector;

  constructor(
    angleRadians: number,
    originElement: AbstractElement,
    position: Position,
    unitVector: UnitVector,
  ) {
    this.angleRadians = angleRadians;
    this.originElement = originElement;
    this.position = position || new Position(0, 0);
    this.unitVector = unitVector;
  }
}

export default AbstractProjectile;
