import P5 from 'p5';

import ClientPlayer from './elements/client-player';
import {SharedConfig} from './shared';
import ClientInputHandler from './client-input-handler';
import Enemy from './elements/enemy';
import ClientWebsocket from './client-websocket';
import { Position } from './shared/utils';

class App {
  private player: ClientPlayer;

  private enemy: Enemy;

  private p5: P5;

  private inputHandler: ClientInputHandler;

  public clientWeboscket: ClientWebsocket;

  constructor(p5: P5, clientWeboscket: ClientWebsocket) {
    this.player = new ClientPlayer(SharedConfig.INITIAL_POS_PLAYER, p5);
    this.enemy = new Enemy(SharedConfig.INITIAL_POS_ENEMY, p5);
    this.clientWeboscket = clientWeboscket;
    this.clientWeboscket.setPlayer(this.player);

    this.p5 = p5;
    this.inputHandler = new ClientInputHandler(
      p5,
      this.player,
      this.clientWeboscket,
    );
  }

  public setup(p: P5): void {
    const canvas = p.createCanvas(
      SharedConfig.CANVAS_WIDTH,
      SharedConfig.CANVAS_HEIGHT
    );
    canvas.parent('sketch-holder');

    document.onmousemove = (e) => {
      const position = new Position(e.x - 440, e.y - 140);
      this.player.setMousePosition(position);
      // this.clientWeboscket.send('move', {});
    };
  }

  public draw(): void {
    this.drawMapElements();
    /*     for (const {
      position: { x, y },
    } of this.player.getProjectiles()) {
      this.p5.circle(x, y, 10);
    }
    this.player.updateProjectiles();
     */
  }

  private drawMapElements(): void {
    for (const [key, cell] of this.clientWeboscket.getMap()) {
      cell.draw();
    }

    this.player.draw();
  }

  public keyPressed(): void {
    this.inputHandler.keyPressed();
  }

  public getPlayer(): ClientPlayer {
    return this.player;
  }

  public mouseClicked({ x, y }: MouseEvent): void {
    this.inputHandler.mouseClicked({ x, y });
  }
}

export default App;
