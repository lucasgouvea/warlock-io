import Position from '../position';
import Element from './element';

class Player extends Element {
  private mousePosition: Position;

  constructor(position: Position) {
    super(position);
    this.mousePosition = new Position(0, 0);
  }

  public getMousePosition(): Position {
    return this.mousePosition;
  }

  public draw(p5: p5) {
    const { x, y } = this.position;
    p5.circle(x, y, 20);
  }

  public setMousePosition(position: Position) {
    this.mousePosition = position;
  }
}

export default Player;
