/* eslint-disable no-new */
/* eslint-disable no-param-reassign */

import P5 from 'p5';
import GeometryUtils from './geometry-utils';

import Player from './elements/player';
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

  static INITIAL_POS = new Position(60, 60);

  constructor(p5: P5) {
    this.player = new Player(App.INITIAL_POS, p5);
    this.positionsMap = new PositionsMap(
      App.CANVAS_WIDTH,
      App.CANVAS_HEIGHT,
      App.GRID_SIZE,
    );
    this.p = p5;
    this.geometryUtils = new GeometryUtils(p5);
  }

  public setup(p: P5): void {
    const canvas = p.createCanvas(App.CANVAS_WIDTH, App.CANVAS_HEIGHT);
    canvas.parent('sketch-holder');
    this.positionsMap.set(this.player);

    // @ts-ignore
    document.onmousemove = (e) => {
      const position = new Position(e.x - 440, e.y - 140);
      this.player.setMousePosition(position);
    };
  }

  public draw(p5: p5): void {
    this.drawGrid();
    this.drawMapElements(p5);
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

  private drawMapElements(p5: p5): void {
    for (const [key, value] of this.positionsMap.map) {
      const [x, y] = key.split(',').map((e) => Number(e));
      if (value !== null) {
        this.player.draw(p5);

        const rightTriangle = this.geometryUtils
          .getRightTriangle(new Position(x, y), this.player.getMousePosition());

        rightTriangle.draw(this.player.getMousePosition().y);

        this.player.drawArm(rightTriangle);
      }
    }
  }
}

const sketch = (p5: P5) => {
  const app = new App(p5);

  p5.setup = () => {
    app.setup(p5);
  };
  p5.draw = () => {
    app.draw(p5);
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
