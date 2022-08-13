import P5 from 'p5';
import Position from '../position';
declare class RightTriangle {
    originalPosition: Position;
    targetPosition: Position;
    angleRadians: number;
    angleComplementRadians: number;
    oppositeSide: number;
    adjacentSide: number;
    angularCoeficient: number;
    p5: P5;
    private hidden;
    static NINETY_DEGREES_IN_RADIANS: number;
    constructor(originalPosition: Position, targetPosition: Position, p5: P5);
    draw(): void;
}
export default RightTriangle;
