import RightTriangle from '../drawings/right-triangle';
import Position from '../position';
import Element from './element';

class Player extends Element {
  private mousePosition: Position;

  private rightTriangle: RightTriangle;

  private rightTriangle2: RightTriangle | null;

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
    this.rightTriangle2 = null;
  }

  public getMousePosition(): Position {
    return this.mousePosition;
  }

  public draw() {
    this.p5.stroke(0);
    this.p5.strokeWeight(1);
    const { x, y } = this.position;
    const { x: xMouse, y: yMouse } = this.mousePosition;
    this.p5.circle(x, y, 20);
    this.p5.circle(xMouse, yMouse, this.CIRCLE_RADIUS * 2);
    this.rightTriangle.draw();
  }

  public drawArm(): void {
    this.p5.stroke(0);
    this.p5.strokeWeight(5);
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

    this.rightTriangle2 = new RightTriangle(
      new Position(armX, armY),
      this.mousePosition,
      this.p5,
    );

    const {
      originalPosition: op,
      targetPosition: tp,
      angleRadians: angleRadians2,
    } = this.rightTriangle2;

    this.rightTriangle2.draw();

    // stick length
    const hypotenuse2 = 25;

    // similarity of triangles again
    const adjacentSide2 = Math.cos(angleRadians2) * hypotenuse2;
    const oppositeSide2 = Math.sin(angleRadians2) * hypotenuse2;

    const isTPxGreaterThanOPx = tp.x > op.x;
    const isTPyGreaterThanOPy = tp.y > op.y;

    const stickX = isTPxGreaterThanOPx
      ? op.x + adjacentSide2
      : op.x - adjacentSide2;
    const stickY = isTPyGreaterThanOPy
      ? op.y + oppositeSide2
      : op.y - oppositeSide2;

    this.p5.line(op.x, op.y, stickX, stickY);
  }

  public setMousePosition(position: Position) {
    this.mousePosition = position;
    this.rightTriangle = new RightTriangle(
      this.position,
      this.mousePosition,
      this.p5,
    );
  }

  public setPosition(position: Position) {
    this.position = position;
    this.rightTriangle = new RightTriangle(
      this.position,
      this.mousePosition,
      this.p5,
    );
  }
}

export default Player;
