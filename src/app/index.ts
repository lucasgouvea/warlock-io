/* eslint-disable no-new */
/* eslint-disable no-param-reassign */

import P5 from 'p5';
import GeometryUtils from './geometry-utils';

import Player from './elements/player';
import Position from './position';
import PositionsMap from './positions-map';
import Config from './config';
import InputHandler from './input-handler';

class App {
  private player: Player;

  private positionsMap: PositionsMap;

  private p5: P5;

  private geometryUtils: GeometryUtils;

  private inputHandler: InputHandler;

  constructor(p5: P5) {
    this.player = new Player(Config.INITIAL_POS, p5);
    this.positionsMap = new PositionsMap(
      Config.CANVAS_WIDTH,
      Config.CANVAS_HEIGHT,
      Config.GRID_SIZE,
    );
    this.p5 = p5;
    this.geometryUtils = new GeometryUtils(p5);
    this.inputHandler = new InputHandler(p5, this.player, this.positionsMap);
  }

  public setup(p: P5): void {
    const canvas = p.createCanvas(Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT);
    canvas.parent('sketch-holder');
    this.positionsMap.set(this.player);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.onmousemove = (e) => {
      const position = new Position(e.x - 440, e.y - 140);
      this.player.setMousePosition(position);
    };
  }

  public draw(): void {
    this.drawGrid();
    this.drawMapElements();
  }

  private drawGrid(): void {
    this.p5.background(220);
    this.p5.stroke(0);
    this.p5.strokeWeight(1);

    for (let x = 0; x < Config.CANVAS_WIDTH; x += Config.GRID_SIZE) {
      this.p5.line(x, 0, x, Config.CANVAS_HEIGHT);
    }

    for (let y = 0; y < Config.CANVAS_HEIGHT; y += Config.GRID_SIZE) {
      this.p5.line(0, y, Config.CANVAS_WIDTH, y);
    }
  }

  private drawMapElements(): void {
    for (const [key, value] of this.positionsMap.map) {
      if (value !== null) {
        this.player.draw();
        this.player.drawArm();
      }
    }
  }

  public keyPressed(): void {
    this.inputHandler.keyPressed();
  }
}

const sketch = (p5: P5) => {
  const app = new App(p5);

  p5.setup = () => {
    app.setup(p5);
  };
  p5.draw = () => {
    app.draw();
  };

  p5.keyPressed = () => {
    app.keyPressed();
  };
};

new P5(sketch);
