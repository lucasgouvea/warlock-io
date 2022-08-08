import Position from './position';
import RightTriangle from './right-triangle';

class GeometryUtils {
  static getRightTriangle(
    originalPosition: Position,
    targetPosition: Position,
  ) {
    return new RightTriangle(originalPosition, targetPosition);
  }
}

export default GeometryUtils;
