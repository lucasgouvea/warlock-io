import ClientPosition from '../utils/client-position';
import ElementTypeEnum from './element-type-enum';

abstract class Element {
  protected position: ClientPosition;

  abstract type: ElementTypeEnum;

  abstract draw(): void;

  constructor(position?: ClientPosition) {
    this.position = position || new ClientPosition(0, 0);
  }

  public getPosition(): ClientPosition {
    return this.position;
  }

  public setPosition(position: ClientPosition): void {
    this.position = position;
  }
}

export default Element;
