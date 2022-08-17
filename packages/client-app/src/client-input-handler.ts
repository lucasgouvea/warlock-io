import P5 from 'p5';

import { ClientPlayer } from './elements';
import {
  CommandClick,
  CommandClickData,
  CommandMovePlayer,
  CommandMovePlayerData,
  CommandMoveMouse,
} from './shared/commands';
import ClientWeboscket from './client-websocket';
import { Position } from './shared/utils';

class ClientInputHandler {
  constructor(
    private p5: P5,
    private player: ClientPlayer,
    private clientWeboscket: ClientWeboscket,
  ) {
    this.p5 = p5;
    this.player = player;
    this.clientWeboscket = clientWeboscket;

    document.onmousemove = (event) => this.mouseMoveHandler(event);
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

  private mouseMoveHandler({ x, y }: MouseEvent) {
    const newX = x - 440; // canvas offset x
    const newY = y - 140; // canvas offset y
    this.clientWeboscket.send(new CommandMoveMouse({ x: newX, y: newY }));
  }
}

export default ClientInputHandler;
