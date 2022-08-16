import { Position, RightTriangle, UnitVector } from '../utils';

import Element from './abstract-element';
import ElementTypeEnum from './element-type-enum';
import Stick from './stick';

abstract class Player extends Element {
  readonly type = ElementTypeEnum.PLAYER;

  readonly CIRCLE_RADIUS = 8;

  private mousePosition: Position;

  private rightTriangleForArm: RightTriangle;

  private rightTriangleForStick: RightTriangle;

  private stick: Stick;

  constructor(position: Position) {
    super(position);
    this.mousePosition = new Position(0, 0);
    this.rightTriangleForArm = new RightTriangle(position, this.mousePosition);
    this.rightTriangleForStick = new RightTriangle(
      position,
      this.mousePosition,
    );
    this.stick = new Stick(new Position(0, 0), new UnitVector(1, 1));
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
    this.setStick();
  }

  public setPosition(position: Position) {
    this.position = position;
    this.rightTriangleForArm = new RightTriangle(
      this.position,
      this.mousePosition,
    );
  }

  public setStick(): void {
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
    const hypotenuse2 = 25;

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

    const unitVector = this.getStickUnitVector(isTPxGreaterThanOPx, isTPyGreaterThanOPy);
    this.stick = new Stick(new Position(stickX2, stickY2), unitVector);
  }

  private getStickUnitVector(
    isTPxGreaterThanOPx: boolean,
    isTPyGreaterThanOPy: boolean,
  ) {
    if (isTPxGreaterThanOPx && !isTPyGreaterThanOPy) {
      return new UnitVector(1, -1);
    }

    if (!isTPxGreaterThanOPx && isTPyGreaterThanOPy) {
      return new UnitVector(-1, 1);
    }

    if (!isTPxGreaterThanOPx && !isTPyGreaterThanOPy) {
      return new UnitVector(-1, -1);
    }

    return new UnitVector(1, 1);
  }
}

export default Player;
