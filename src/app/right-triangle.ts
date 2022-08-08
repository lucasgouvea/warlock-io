import Position from './position';

class RightTriangle {
  private originalPosition: Position;

  private targetPosition: Position;

  private angle: number;

  private angleRadians: number;

  private angleComplementRadians: number;

  private oppositeSide: number;

  private adjacentSide: number;

  private angularCoeficient: number;

  static NINETY_DEGREES_IN_RADIANS = Math.PI / 2;

  constructor(originalPosition, targetPosition) {
    this.originalPosition = originalPosition;
    this.targetPosition = targetPosition;
    this.adjacentSide = Math.abs(targetPosition.x - originalPosition.x);
    this.oppositeSide = Math.abs(targetPosition.y - originalPosition.y);
    this.angularCoeficient = this.oppositeSide / this.adjacentSide;
    this.angleRadians = Math.atan(this.angularCoeficient);
    this.angleComplementRadians = RightTriangle.NINETY_DEGREES_IN_RADIANS - this.angleRadians;
  }
}

export default RightTriangle;
