import P5 from 'p5';

import RightTriangle from '../utils/right-triangle';
import ClientPosition from '../utils/client-position';
import { Ball } from '../projectiles';
import { UnitVector } from '../utils';
import Element from './element';
import ElementTypeEnum from './element-type-enum';

class ClientPlayer extends Element {
  readonly type = ElementTypeEnum.PLAYER;

  private mousePosition: ClientPosition;

  public rightTriangle: RightTriangle;

  public rightTriangle2: RightTriangle;

  private p5: P5;

  public stickPosition: {
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

export default ClientPlayer;
