import P5 from 'p5';
import Position from '../position';

abstract class Element {
  protected position: Position;

  abstract draw(p: P5): void;

  constructor(position?: Position) {
    this.position = position || new Position(0, 0);
  }

  public getPosition(): Position {
    return this.position;
  }
}

export default Element;
