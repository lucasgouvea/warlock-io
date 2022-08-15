import P5 from 'p5';

import RightTriangle from '../drawings/right-triangle';
import ClientPosition from '../utils/client-position';
import { Ball } from '../projectiles';
import { UnitVector } from '../utils';
import Element from './element';
import ElementTypeEnum from './element-type-enum';

class Player extends Element {
  readonly type = ElementTypeEnum.PLAYER;

  private mousePosition: ClientPosition;

  private rightTriangle: RightTriangle;

  private rightTriangle2: RightTriangle;

  private p5: P5;

  private stickPosition: {
    position: ClientPosition;
    unitVector: UnitVector;
  };

  readonly CIRCLE_RADIUS = 8;

  private ballProjectiles: Ball[];

  constructor(position: ClientPosition, p5: P5) {
    super(position);
    this.mousePosition = new ClientPosition(0, 0);
    this.p5 = p5;
    this.rightTriangle = new RightTriangle(
      position,
      this.mousePosition,
      this.p5,
    );
    this.rightTriangle2 = new RightTriangle(
      position,
      this.mousePosition,
      this.p5,
    );
    this.stickPosition = {
      position: new ClientPosition(0, 0),
      unitVector: { x: 1, y: 1 },
    };
    this.ballProjectiles = [];
  }

  public getMousePosition(): ClientPosition {
    return this.mousePosition;
  }

  public draw() {
    const { x, y } = this.position;
    const { x: xMouse, y: yMouse } = this.mousePosition;
    this.p5.circle(x, y, 42);
    this.p5.circle(xMouse, yMouse, this.CIRCLE_RADIUS * 2);
    this.rightTriangle.draw();
    this.drawArm();
  }

  private drawArm(): void {
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
      new ClientPosition(armX, armY),
      this.mousePosition,
      this.p5,
    );
    this.rightTriangle2.draw();

    const {
      originalPosition: op,
      targetPosition: tp,
      angleRadians: angleRadians2,
    } = this.rightTriangle2;

    // stick length
    const hypotenuse2 = 45;

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

    let unitVector: UnitVector = { x: 1, y: 1 };

    if (isTPxGreaterThanOPx && !isTPyGreaterThanOPy) {
      unitVector = { x: 1, y: -1 };
    }

    if (!isTPxGreaterThanOPx && isTPyGreaterThanOPy) {
      unitVector = { x: -1, y: 1 };
    }

    if (!isTPxGreaterThanOPx && !isTPyGreaterThanOPy) {
      unitVector = { x: -1, y: -1 };
    }

    this.stickPosition = { position: new ClientPosition(stickX, stickY), unitVector };

    this.p5.line(op.x, op.y, stickX, stickY);
  }

  public setMousePosition(position: ClientPosition) {
    this.mousePosition = position;
    this.rightTriangle = new RightTriangle(
      this.position,
      this.mousePosition,
      this.p5,
    );
  }

  public setPosition(position: ClientPosition) {
    this.position = position;
    this.rightTriangle = new RightTriangle(
      this.position,
      this.mousePosition,
      this.p5,
    );
  }

  public shoot(): void {
    const { angleRadians } = this.rightTriangle2;
    const { position, unitVector } = this.stickPosition;

    const projectile = new Ball(position, angleRadians, unitVector, this.p5);

    this.ballProjectiles.push(projectile);
  }

  public getProjectiles(): Ball[] {
    return this.ballProjectiles;
  }

  public updateProjectiles(): void {
    this.ballProjectiles = this.ballProjectiles.map(
      ({ position, angleRadians, unitVector }) => {
        const { x, y } = position;
        const newX = x + unitVector.x * Math.cos(angleRadians) * 2;
        const newY = y + unitVector.y * Math.sin(angleRadians) * 2;

        const ball = new Ball(
          new ClientPosition(newX, newY),
          angleRadians,
          unitVector,
          this.p5,
        );

        return ball;
      },
    );
  }
}

export default Player;
