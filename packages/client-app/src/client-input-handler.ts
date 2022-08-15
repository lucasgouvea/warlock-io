import P5 from 'p5';

import { Player } from './elements';
import KeyInput from './key-input';
import ClientWeboscket from './client-websocket';

class ClientInputHandler {
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

  public mouseClicked(): void {
    this.clientWeboscket.send('clicked');
  }

  private movePlayer(input: KeyInput): void {
    this.clientWeboscket.send('move', input);
  }
}

export default ClientInputHandler;
