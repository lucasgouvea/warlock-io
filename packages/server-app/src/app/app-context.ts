import { RawData } from 'ws';
import ServerPlayer from './server-player';
import ServerInputHandler from './server-input-handler';
import PositionsMap from './positions-map';
import AbstractCommand from '../shared/commands/abstract-command';
import { Position } from '../shared/utils';

class AppContext {
  private inputHandler: ServerInputHandler;

  private player: ServerPlayer;

  private positionsMap: PositionsMap;

  constructor() {
    this.player = new ServerPlayer(new Position(100, 100));
    this.positionsMap = new PositionsMap();
    this.positionsMap.set(this.player);
    this.inputHandler = new ServerInputHandler(this.player, this.positionsMap);
  }

  public serialize(): string {
    const obj = Object.fromEntries(this.positionsMap.getMap());
    return JSON.stringify(obj);
  }

  public handle(data: RawData): void {
    const command = JSON.parse(data.toString()) as AbstractCommand<unknown>;

    this.inputHandler.handle(command);
  }
}

export default AppContext;