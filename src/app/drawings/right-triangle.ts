import P5 from 'p5';
import Position from '../position';

class RightTriangle {
  public originalPosition: Position;

  public targetPosition: Position;

  public angleRadians: number;

  public angleComplementRadians: number;

  public oppositeSide: number;

  public adjacentSide: number;

  public angularCoeficient: number;

  public p5: P5;

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

  public draw(mousePositionY: number): void {
    const { x, y } = this.originalPosition;
    const { x: targetX, y: targetY } = this.targetPosition;
    const { adjacentSide } = this;

    const mousePosYIsBeneathPlayer = mousePositionY - y > 0;

    this.p5.line(x, y, targetX, targetY); // distance between 2 points
    this.p5.line(x, y, targetX, y); // adjacent side

    this.p5.line(
      x + adjacentSide,
      y,
      x + adjacentSide,
      mousePosYIsBeneathPlayer ? y + this.oppositeSide : y - this.oppositeSide,
    ); // opposite side
  }
}

export default RightTriangle;
