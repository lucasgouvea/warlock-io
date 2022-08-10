import Position from '../position';
import Element from './element';

class Player extends Element {
  private mousePosition: Position;

  readonly CIRCLE_RADIUS: number = 5;

  constructor(position: Position) {
    super(position);
    this.mousePosition = new Position(0, 0);
  }

  public getMousePosition(): Position {
    return this.mousePosition;
  }

  public draw(p5: p5) {
    const { x, y } = this.position;
    const { x: xMouse, y: yMouse } = this.mousePosition;
    p5.circle(x, y, 20);
    p5.circle(xMouse, yMouse, this.CIRCLE_RADIUS * 2);
  }

  public setMousePosition(position: Position) {
    this.mousePosition = position;
  }
}

export default Player;
