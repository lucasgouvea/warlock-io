import RightTriangle from './right-triangle.js';

class GeometryUtils {
  static getRightTriangle(originalPosition, targetPosition) {
    return new RightTriangle(originalPosition, targetPosition);
  }
}

export default GeometryUtils;
