import P5 from 'p5';
import Position from './position';

class RightTriangle {
  private originalPosition: Position;

  private targetPosition: Position;

  private angleRadians: number;

  private angleComplementRadians: number;

  private oppositeSide: number;

  private adjacentSide: number;

  private angularCoeficient: number;

  private p5: P5;

  static NINETY_DEGREES_IN_RADIANS = Math.PI / 2;

  constructor(originalPosition: Position, targetPosition: Position, p5: P5) {
    this.originalPosition = originalPosition;
    this.targetPosition = targetPosition;
    this.adjacentSide = Math.abs(targetPosition.x - originalPosition.x);
    this.oppositeSide = Math.abs(targetPosition.y - originalPosition.y);
    this.angularCoeficient = this.oppositeSide / this.adjacentSide;
    this.angleRadians = Math.atan(this.angularCoeficient);
    this.angleComplementRadians = RightTriangle.NINETY_DEGREES_IN_RADIANS - this.angleRadians;
    this.p5 = p5;
  }

  draw() {
    this.p5.line(
      this.originalPosition.x,
      this.originalPosition.y,
      this.targetPosition.x,
      this.targetPosition.y,
    ); // distance between 2 points
    this.p5.line(
      this.originalPosition.x,
      this.originalPosition.y,
      this.targetPosition.x,
      this.originalPosition.y,
    ); // adjacent side
  }
}

export default RightTriangle;
