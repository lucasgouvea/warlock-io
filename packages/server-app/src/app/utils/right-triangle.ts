import Position from '../position';
import Config from '../config';

class RightTriangle {
  public originalPosition: Position;

  public targetPosition: Position;

  public angleRadians: number;

  public angleComplementRadians: number;

  public oppositeSide: number;

  public adjacentSide: number;

  public angularCoeficient: number;


  private hidden: boolean;

  static NINETY_DEGREES_IN_RADIANS = Math.PI / 2;

  constructor(originalPosition: Position, targetPosition: Position) {
    this.originalPosition = originalPosition;
    this.targetPosition = targetPosition;
    this.adjacentSide = Math.abs(targetPosition.x - originalPosition.x);
    this.oppositeSide = Math.abs(targetPosition.y - originalPosition.y);
    this.angularCoeficient = this.oppositeSide / this.adjacentSide;
    this.angleRadians = Math.atan(this.angularCoeficient);
    this.angleComplementRadians = RightTriangle.NINETY_DEGREES_IN_RADIANS - this.angleRadians;
    this.hidden = Config.TRIANGLE_HIDDEN;
  }

}

export default RightTriangle;
