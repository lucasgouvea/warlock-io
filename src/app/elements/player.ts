import RightTriangle from '../drawings/right-triangle';
import Position from '../position';
import Element from './element';

class Player extends Element {
  private mousePosition: Position;

  private rightTriangle: RightTriangle;

  private p5: p5;

  readonly CIRCLE_RADIUS: number = 5;

  constructor(position: Position, p5: p5) {
    super(position);
    this.mousePosition = new Position(0, 0);
    this.p5 = p5;
    this.rightTriangle = new RightTriangle(
      position,
      this.mousePosition,
      this.p5,
    );
  }

  public getMousePosition(): Position {
    return this.mousePosition;
  }

  public draw() {
    const { x, y } = this.position;
    const { x: xMouse, y: yMouse } = this.mousePosition;
    this.p5.circle(x, y, 20);
    this.p5.circle(xMouse, yMouse, this.CIRCLE_RADIUS * 2);
    this.rightTriangle.draw();
  }

  public drawArm(): void {
    const {
      angleComplementRadians,
      adjacentSide,
      originalPosition: { x, y },
    } = this.rightTriangle;

    const oppositeSide = Math.tan(angleComplementRadians) * adjacentSide;
    const hypotenuse = Math.sqrt(adjacentSide ** 2 + oppositeSide ** 2);

    // similarity of triangles
    const x2 = (this.CIRCLE_RADIUS * oppositeSide) / hypotenuse;
    const y2 = (this.CIRCLE_RADIUS * adjacentSide) / hypotenuse;

    // why 2?
    const armX = x + x2 * 2;
    const armY = y + y2 * 2;
    this.p5.line(
      armX,
      armY,
      this.getMousePosition().x,
      this.getMousePosition().y,
    );
  }

  public setMousePosition(position: Position) {
    this.mousePosition = position;
    this.rightTriangle.setTargetPosition(this.mousePosition);
  }

  public setPosition(position: Position) {
    this.position = position;
    this.rightTriangle.setOriginalPosition(this.position);
  }
}

export default Player;
