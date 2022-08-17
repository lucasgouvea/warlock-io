import { RawData } from 'ws';
import ServerPlayer from './server-player';
import ServerInputHandler from './server-input-handler';
import PositionsMap from './positions-map';
import AbstractCommand from '../shared/commands/abstract-command';
import { Position } from '../shared/utils';
import { AbstractProjectile } from '../shared/elements/projectile';

class AppContext {
  private inputHandler: ServerInputHandler;

  private player: ServerPlayer;

  private positionsMap: PositionsMap;

  private projectiles: AbstractProjectile[];

  constructor() {
    this.positionsMap = new PositionsMap();
    this.player = new ServerPlayer(new Position(100, 100));
    this.projectiles = [];

    this.inputHandler = new ServerInputHandler(
      this.player,
      this.positionsMap,
      this.projectiles,
    );
    this.positionsMap.set(this.player);
  }

  public serialize(): string {
    const map = Object.fromEntries(this.positionsMap.getMap());
    const data = { map, projectiles: this.projectiles };
    return JSON.stringify(data);
  }

  public handle(data: RawData): void {
    const command = JSON.parse(data.toString()) as AbstractCommand<unknown>;

    this.inputHandler.handle(command);
  }
}

export default AppContext;
