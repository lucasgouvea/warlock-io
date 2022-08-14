import P5 from 'p5';

import Player from './elements/player';
import Position from './position';
import Config from './config';
import InputHandler from './input-handler';
import Enemy from './elements/enemy';
import ClientWebsocket from './client-websocket';

class App {
  private player: Player;

  private enemy: Enemy;

  private p5: P5;

  private inputHandler: InputHandler;

  public clientWeboscket: ClientWebsocket;

  constructor(p5: P5, clientWeboscket: ClientWebsocket) {
    // this.player = new Player(Config.INITIAL_POS_PLAYER, p5);
    this.enemy = new Enemy(Config.INITIAL_POS_ENEMY, p5);
    this.clientWeboscket = clientWeboscket;

    this.p5 = p5;
    this.inputHandler = new InputHandler(p5, this.player, this.clientWeboscket);
  }

  public setup(p: P5): void {
    const canvas = p.createCanvas(Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT);
    canvas.parent('sketch-holder');

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
    /*     for (const {
      position: { x, y },
    } of this.player.getProjectiles()) {
      this.p5.circle(x, y, 10);
    }
    this.player.updateProjectiles();
     */
  }

  private drawGrid(): void {
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
    for (const [key, cell] of this.clientWeboscket.getMap()) {
      cell.draw();
    }
  }

  public keyPressed(): void {
    this.inputHandler.keyPressed();
  }

  public getPlayer(): Player {
    return this.player;
  }
}

export default App;
