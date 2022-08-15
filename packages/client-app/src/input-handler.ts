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
    this.clientWeboscket.send('move', input);

    // TODO: send to server this.player.setPosition(new ClientPosition(newX, newY));
    // TODO: send to server - this.positionsMap.clear(new ClientPosition(x, y));
    // TODO: send to server -this.positionsMap.set(this.player);
  }
}

export default InputHandler;
