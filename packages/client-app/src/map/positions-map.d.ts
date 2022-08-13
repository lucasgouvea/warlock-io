import P5 from 'p5';
import Position from '../position';
import { Element } from '../elements';
import Cell from './cell';
declare class PositionsMap {
    private map;
    private p5;
    constructor(width: number, height: number, gridSize: number, p5: P5);
    init(position: Position): void;
    clear({ x, y }: Position): void;
    set(element: Element): void;
    get({ x, y }: Position): Element | null;
    getMap(): Map<string, Cell>;
}
export default PositionsMap;
