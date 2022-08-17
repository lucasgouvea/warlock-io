import P5 from 'p5';
import { ClientPlayer } from './elements';
import Cell from './map/client-cell';
import PositionsMap from './map/positions-map';
import { ClientBallProjectile } from './projectiles';
import { AbstractCommand } from './shared/commands';
import { AbstractProjectile } from './shared/elements/projectile';

class ClientWebsocket {
  public positionsMap: PositionsMap;

  public player: ClientPlayer;

  private socket: WebSocket;

  constructor(p5: P5) {
    this.socket = new WebSocket('ws://localhost:8888/player?id=60');
    this.positionsMap = new PositionsMap(p5);
    this.socket.onmessage = (event: MessageEvent<string>) => {
      const { map, projectiles } = JSON.parse(event.data);
      this.positionsMap.parseMap(map, this.player);
      this.positionsMap.parseProjectiles(projectiles);
    };
  }

  public getMap(): Map<string, Cell> {
    return this.positionsMap.getMap();
  }

  public getProjectiles(): ClientBallProjectile[] {
    return this.positionsMap.getProjectiles();
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
