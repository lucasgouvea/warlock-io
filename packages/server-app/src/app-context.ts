import { RawData } from 'ws';
import { ServerPlayer } from './app/elements';
import ServerInputHandler from './app/server-input-handler';
import Position from './app/utils/server-position';
import PositionsMap from './app/positions-map';
import AbstractCommand from './shared/commands/abstract-command';

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
