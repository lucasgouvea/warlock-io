import P5 from 'p5';
import { Player } from '../elements';
import KeyInput from '../key-input';
import Cell from '../map/cell';
import PositionsMap from '../map/positions-map';

class ClientWebsocket {
  public positionsMap: PositionsMap;

  public player: Player;

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

  public setPlayer(player: Player) {
    this.player = player;
  }

  public send(command: string, input: KeyInput) {
    const data = JSON.stringify({ command, input });
    this.socket.send(data);
  }
}

export default ClientWebsocket;
