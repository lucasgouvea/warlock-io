import { Position } from '../shared/utils';
import ElementTypeEnum from './element-type-enum';

abstract class Element {
  protected position: Position;

  abstract type: ElementTypeEnum;

  abstract draw(): void;

  constructor(position?: Position) {
    this.position = position || new Position(0, 0);
  }

  public getPosition(): Position {
    return this.position;
  }

  public setPosition(position: Position): void {
    this.position = position;
  }
}

export default Element;
