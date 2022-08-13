import P5 from 'p5';
import { Element } from '../elements';
import Position from '../position';
import { Projectile } from '../projectiles';
declare class Cell {
    centerPosition: Position;
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    private p5;
    private element;
    constructor(element: Element | null, centerPosition: Position, p5: P5);
    draw(projectiles: Projectile[]): void;
    isInside(projectil: Projectile): boolean;
    setElement(element: Element | null): void;
    getElement(): Element | null;
}
export default Cell;
