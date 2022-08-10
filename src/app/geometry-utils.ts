import P5 from 'p5';

import Position from './position';
import RightTriangle from './drawings/right-triangle';

class GeometryUtils {
  private p5: P5;

  constructor(p5: P5) {
    this.p5 = p5;
  }

  public getRightTriangle(
    originalPosition: Position,
    targetPosition: Position,
  ): RightTriangle {
    return new RightTriangle(originalPosition, targetPosition, this.p5);
  }
}

export default GeometryUtils;
