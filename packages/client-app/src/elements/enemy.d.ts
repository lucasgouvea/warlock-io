import P5 from 'p5';
import Position from '../position';
import Element from './element';
import ElementTypeEnum from './element-type-enum';
declare class Enemy extends Element {
    readonly type = ElementTypeEnum.ENEMY;
    private p5;
    private hp;
    constructor(position: Position, p5: P5);
    draw(): void;
}
export default Enemy;
