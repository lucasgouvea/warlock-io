import P5 from 'p5';

import Config from './config';
import { Player } from './elements';
import KeyInput from './key-input';
import ClientWeboscket from './client-websocket';

class InputHandler {
  constructor(
    private p5: P5,
    private player: Player,
    private clientWeboscket: ClientWeboscket,
  ) {
    this.p5 = p5;
    this.player = player;
    this.clientWeboscket = clientWeboscket;
  }

  public keyPressed(): void {
    this.movePlayer(this.p5.keyCode as KeyInput);
  }

  private movePlayer(input: KeyInput) {
    const { x, y } = this.player.getPosition();
    let newX = x;
    let newY = y;

    switch (input) {
      case KeyInput.A:
        newX -= Config.GRID_SIZE;
        break;
      case KeyInput.S:
        newY += Config.GRID_SIZE;
        break;
      case KeyInput.D:
        newX += Config.GRID_SIZE;
        break;
      case KeyInput.W:
        newY -= Config.GRID_SIZE;
        break;
      default:
        break;
    }

    // TODO: send to server this.player.setPosition(new Position(newX, newY));
    // TODO: send to server - this.positionsMap.clear(new Position(x, y));
    // TODO: send to server -this.positionsMap.set(this.player);
  }
}

export default InputHandler;
