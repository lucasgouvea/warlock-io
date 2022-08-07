class RightTriangle {
  originalPosition;

  targetPosition;

  angle;

  oppositeSide;

  angularCoeficient;

  constructor(originalPosition, targetPosition) {
    this.originalPosition = originalPosition;
    this.targetPosition = targetPosition;
    this.adjacentSide = Math.abs(targetPosition.x - originalPosition.x);
    this.oppositeSide = Math.abs(targetPosition.y - originalPosition.y);
    this.angularCoeficient = this.oppositeSide / this.adjacentSide;
    this.angleRadians = Math.atan(this.angularCoeficient);
    this.angleComplementRadians = Math.PI / 2 - this.angleRadians;
  }
}

export default RightTriangle;
