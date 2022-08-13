import { UnitVector, RightTriangle } from '../utils';
import Position from '../position';
import { Ball } from '../projectiles';
import Element from './element';
import ElementTypeEnum from './element-type-enum';

class Player extends Element {
  readonly type = ElementTypeEnum.PLAYER;

  private mousePosition: Position;

  private rightTriangle: RightTriangle;

  private rightTriangle2: RightTriangle;


  private stickPosition: {
    position: Position;
    unitVector: UnitVector;
  };

  readonly CIRCLE_RADIUS = 8;

  private ballProjectiles: Ball[];

  constructor(position: Position) {
    super(position);
    this.mousePosition = new Position(0, 0);
    this.rightTriangle = new RightTriangle(
      position,
      this.mousePosition,
    );
    this.rightTriangle2 = new RightTriangle(
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
    this.rightTriangle = new RightTriangle(
      this.position,
      this.mousePosition,
    );
  }

  public setPosition(position: Position) {
    this.position = position;
    this.rightTriangle = new RightTriangle(
      this.position,
      this.mousePosition,
    );
  }

  public shoot(): void {
    const { angleRadians } = this.rightTriangle2;
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
}

export default Player;
