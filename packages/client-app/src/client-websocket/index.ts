import P5 from 'p5';
import { ClientPlayer } from '../elements';
import Cell from '../map/cell';
import PositionsMap from '../map/positions-map';
import { AbstractCommand } from '../shared';

class ClientWebsocket {
  public positionsMap: PositionsMap;

  public player: ClientPlayer;

  private socket: WebSocket;

  constructor(p5: P5) {
    this.socket = new WebSocket('ws://localhost:8888/player?id=60');
    this.positionsMap = new PositionsMap(p5);
    this.socket.onmessage = (event: MessageEvent<string>) => {
      this.positionsMap.parseMap(event, this.player);
    };
  }

  public getMap(): Map<string, Cell> {
    return this.positionsMap.getMap();
  }

  public setPlayer(player: ClientPlayer) {
    this.player = player;
  }

  public send(command: AbstractCommand<unknown>) {
    const data = JSON.stringify(command);
    this.socket.send(data);
  }
}

export default ClientWebsocket;
