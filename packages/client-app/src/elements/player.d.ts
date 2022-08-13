import P5 from 'p5';
import Position from '../position';
import { Ball } from '../projectiles';
import Element from './element';
import ElementTypeEnum from './element-type-enum';
declare class Player extends Element {
    readonly type = ElementTypeEnum.PLAYER;
    private mousePosition;
    private rightTriangle;
    private rightTriangle2;
    private p5;
    private stickPosition;
    readonly CIRCLE_RADIUS = 8;
    private ballProjectiles;
    constructor(position: Position, p5: P5);
    getMousePosition(): Position;
    draw(): void;
    drawArm(): void;
    setMousePosition(position: Position): void;
    setPosition(position: Position): void;
    shoot(): void;
    getProjectiles(): Ball[];
    updateProjectiles(): void;
}
export default Player;
