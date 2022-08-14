import Position from '../position';
import ElementTypeEnum from './element-type-enum';

abstract class Element {
  protected position: Position;

  abstract type: ElementTypeEnum

  constructor(position?: Position) {
    this.position = position || new Position(0, 0);
  }

  public getPosition(): Position {
    return this.position;
  }
}

export default Element;
