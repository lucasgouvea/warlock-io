import P5 from 'p5';
import Position from '../position';
import { UnitVector } from '../utils';
declare abstract class Projectile {
    angleRadians: number;
    position: Position;
    protected p5: P5;
    unitVector: UnitVector;
    abstract draw(): void;
    constructor(position: Position, angleRadians: number, unitVector: UnitVector, p5: P5);
    getPosition(): Position;
}
export default Projectile;
