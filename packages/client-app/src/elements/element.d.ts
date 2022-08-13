import Position from '../position';
import ElementTypeEnum from './element-type-enum';
declare abstract class Element {
    protected position: Position;
    abstract type: ElementTypeEnum;
    abstract draw(): void;
    constructor(position?: Position);
    getPosition(): Position;
}
export default Element;
