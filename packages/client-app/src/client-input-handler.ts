import P5 from 'p5';

import { ClientPlayer } from './elements';
import {
  CommandClick, CommandClickData, CommandMovePlayer, CommandMovePlayerData,
} from './shared/commands';
import ClientWeboscket from './client-websocket';

class ClientInputHandler {
  constructor(
    private p5: P5,
    private player: ClientPlayer,
    private clientWeboscket: ClientWeboscket,
  ) {
    this.p5 = p5;
    this.player = player;
    this.clientWeboscket = clientWeboscket;
  }

  public keyPressed(): void {
    this.movePlayer(this.p5.keyCode as CommandMovePlayerData);
  }

  public mouseClicked(data: CommandClickData): void {
    this.clientWeboscket.send(new CommandClick(data));
  }

  private movePlayer(data: CommandMovePlayerData): void {
    this.clientWeboscket.send(new CommandMovePlayer(data));
  }
}

export default ClientInputHandler;
