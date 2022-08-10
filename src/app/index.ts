/* eslint-disable no-new */
/* eslint-disable no-param-reassign */

import P5 from 'p5';
import GeometryUtils from './geometry-utils';

import Player from './player';
import Position from './position';
import PositionsMap from './positions-map';

class App {
  private player: Player;

  private positionsMap: PositionsMap;

  private p: P5;

  private geometryUtils: GeometryUtils;

  static CANVAS_WIDTH = 400;

  static CANVAS_HEIGHT = 400;

  static GRID_SIZE = 40;

  static CIRCLE_RADIUS = 5;

  static INITIAL_POS = new Position(60, 60);

  constructor(p: P5) {
    this.player = new Player(App.INITIAL_POS);
    this.positionsMap = new PositionsMap(
      App.CANVAS_WIDTH,
      App.CANVAS_HEIGHT,
      App.GRID_SIZE,
    );
    this.p = p;
    this.geometryUtils = new GeometryUtils(p);
  }

  public setup(): void {
    const canvas = this.p.createCanvas(App.CANVAS_WIDTH, App.CANVAS_HEIGHT);
    canvas.parent('sketch-holder');

    this.positionsMap.set(this.player.position, this.player);

    // @ts-ignore
    document.onmousemove = (e) => {
      this.player.mousePosition.x = e.x - 440;
      this.player.mousePosition.y = e.y - 140;
    };
  }

  public draw(): void {
    this.drawGrid();
    this.drawMapElements();
  }

  private drawGrid(): void {
    this.p.background(220);
    this.p.stroke(0);
    this.p.strokeWeight(1);

    for (let x = 0; x < App.CANVAS_WIDTH; x += App.GRID_SIZE) {
      this.p.line(x, 0, x, App.CANVAS_HEIGHT);
    }

    for (let y = 0; y < App.CANVAS_HEIGHT; y += App.GRID_SIZE) {
      this.p.line(0, y, App.CANVAS_WIDTH, y);
    }
  }

  private drawMapElements(): void {
    for (const [key, value] of this.positionsMap.map) {
      const [x, y] = key.split(',').map((e) => Number(e));
      if (value !== null) {
        this.p.circle(x, y, 20);

        this.p.circle(
          this.player.mousePosition.x,
          this.player.mousePosition.y,
          App.CIRCLE_RADIUS * 2,
        );

        const rightTriangle = this.geometryUtils.getRightTriangle(
          new Position(x, y),
          this.player.getMousePosition(),
        );

        rightTriangle.draw();
        const mousePosYIsBeneathPlayer = this.player.mousePosition.y - y > 0;

        const ca = this.player.mousePosition.x - x;
        const co = Math.abs(this.player.mousePosition.y - y);
        const m = co / ca;

        const angleRadians = Math.atan(m);
        const complementAngleRadians = Math.PI / 2 - angleRadians;
        const co2 = Math.tan(complementAngleRadians) * ca;

        this.p.line(
          x + ca,
          y,
          x + ca,
          mousePosYIsBeneathPlayer ? y + co : y - co,
        );
        this.p.stroke(80, 204, 44);

        this.p.stroke(255, 0, 0);
        const h = Math.sqrt(ca ** 2 + co2 ** 2);
        const yUn = (App.CIRCLE_RADIUS * co2) / h;
        const xUn = (App.CIRCLE_RADIUS * ca) / h;

        const armX = x + xUn * 2;
        const armY = y + yUn * 2;
        this.p.line(
          armX,
          armY,
          this.player.mousePosition.x,
          this.player.mousePosition.y,
        );
      }
    }
  }
}

const sketch = (p: P5) => {
  const app = new App(p);

  p.setup = () => {
    const canvas = p.createCanvas(App.CANVAS_WIDTH, App.CANVAS_HEIGHT);
    canvas.parent('sketch-holder');
  };
  p.draw = () => {
    app.draw();
  };

/*   p.keyPressed = () => {
    let newXPosition;
    let newYPosition;

    switch (p.keyCode) {
      case 65:
        newXPosition = app.player.position.x - App.GRID_SIZE;
        app.positionsMap.set(app.player.position, null);
        app.player.position.x = newXPosition;
        app.positionsMap.set(
          { ...app.player.position, x: newXPosition },
          app.player,
        );
        break;
      case 83:
        newYPosition = app.player.position.y + App.GRID_SIZE;
        app.positionsMap.set(app.player.position, null);
        app.player.position.y = newYPosition;
        app.positionsMap.set(
          { ...app.player.position, y: newYPosition },
          app.player,
        );
        break;
      case 68:
        newXPosition = app.player.position.x + App.GRID_SIZE;
        app.positionsMap.set(app.player.position, null);
        app.player.position.x = newXPosition;
        app.positionsMap.set(
          { ...app.player.position, x: newXPosition },
          app.player,
        );
        break;
      case 87:
        newYPosition = app.player.position.y - App.GRID_SIZE;
        app.positionsMap.set(app.player.position, null);
        app.player.position.y = newYPosition;
        app.positionsMap.set(
          { ...app.player.position, y: newYPosition },
          app.player,
        );
        break;
      default:
        break;
    }
  }; */
};

new P5(sketch);
