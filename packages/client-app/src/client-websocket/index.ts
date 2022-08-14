import P5 from 'p5';
import Cell from '../map/cell';
import PositionsMap from '../map/positions-map';

class ClientWebsocket {
  public positionsMap: PositionsMap;

  constructor(p5: P5) {
    const socket = new WebSocket('ws://localhost:8888/player?id=60');
    this.positionsMap = new PositionsMap(p5);
    socket.onmessage = (event: MessageEvent<string>) => {
      this.positionsMap.parseMap(event);
    };
  }

  getMap(): Map<string, Cell> {
    return this.positionsMap.getMap();
  }
}

export default ClientWebsocket;