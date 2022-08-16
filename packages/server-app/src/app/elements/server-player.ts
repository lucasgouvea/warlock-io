import { Position, RightTriangle, UnitVector } from '../../shared/utils';
import { Ball } from '../projectiles';
import Element from './element';
import ElementTypeEnum from './element-type-enum';

class ServerPlayer extends Element {
  readonly type = ElementTypeEnum.PLAYER;

  private mousePosition: Position;

  private rightTriangleForArm: RightTriangle;

  private rightTriangleForStick: RightTriangle;

  private stickPosition: {
    position: Position;
    unitVector: UnitVector;
  };

  readonly CIRCLE_RADIUS = 8;

  private ballProjectiles: Ball[];

  constructor(position: Position) {
    super(position);
    this.mousePosition = new Position(0, 0);
    this.rightTriangleForArm = new RightTriangle(position, this.mousePosition);
    this.rightTriangleForStick = new RightTriangle(
      position,
      this.mousePosition,
    );
    this.stickPosition = {
      position: new Position(0, 0),
      unitVector: { x: 1, y: 1 },
    };
    this.ballProjectiles = [];
  }

  public getMousePosition(): Position {
    return this.mousePosition;
  }

  public setMousePosition(position: Position) {
    this.mousePosition = position;
    this.rightTriangleForArm = new RightTriangle(
      this.position,
      this.mousePosition,
    );
  }

  public setPosition(position: Position) {
    this.position = position;
    this.rightTriangleForArm = new RightTriangle(
      this.position,
      this.mousePosition,
    );
  }

  public shoot(): void {
    const { angleRadians } = this.rightTriangleForStick;
    const { position, unitVector } = this.stickPosition;

    const projectile = new Ball(position, angleRadians, unitVector);

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
          new Position(newX, newY),
          angleRadians,
          unitVector,
        );

        return ball;
      },
    );
  }

  public setStickPosition(): void {
    const {
      angleComplementRadians,
      adjacentSide,
      originalPosition: { x, y },
    } = this.rightTriangleForArm;

    const oppositeSide = Math.tan(angleComplementRadians) * adjacentSide;
    const hypotenuse = Math.sqrt(adjacentSide ** 2 + oppositeSide ** 2);

    // similarity of triangles
    const x2 = (this.CIRCLE_RADIUS * oppositeSide) / hypotenuse;
    const y2 = (this.CIRCLE_RADIUS * adjacentSide) / hypotenuse;

    // why 2?
    const stickX1 = x + x2 * 2;
    const stickY1 = y + y2 * 2;

    this.rightTriangleForStick = new RightTriangle(
      new Position(stickX1, stickY1),
      this.mousePosition,
    );

    const {
      originalPosition: op,
      targetPosition: tp,
      angleRadians: angleRadians2,
    } = this.rightTriangleForStick;

    // stick length
    const hypotenuse2 = 45;

    // similarity of triangles again
    const adjacentSide2 = Math.cos(angleRadians2) * hypotenuse2;
    const oppositeSide2 = Math.sin(angleRadians2) * hypotenuse2;

    const isTPxGreaterThanOPx = tp.x > op.x;
    const isTPyGreaterThanOPy = tp.y > op.y;

    const stickX2 = isTPxGreaterThanOPx
      ? op.x + adjacentSide2
      : op.x - adjacentSide2;
    const stickY2 = isTPyGreaterThanOPy
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

    this.stickPosition = {
      position: new Position(stickX2, stickY2),
      unitVector,
    };
  }
}

export default ServerPlayer;
