import ServerPosition from '../utils/server-position';
import ElementTypeEnum from './element-type-enum';

abstract class Element {
  protected position: ServerPosition;

  abstract type: ElementTypeEnum

  constructor(position?: ServerPosition) {
    this.position = position || new ServerPosition(0, 0);
  }

  public getPosition(): ServerPosition {
    return this.position;
  }
}

export default Element;
