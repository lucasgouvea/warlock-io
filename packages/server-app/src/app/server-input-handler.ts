import ServerConfig from '../server-config';
import { ServerPlayer } from './elements';
import { AbstractCommand, CommandMovePlayerData, CommandTypeEnum } from '../shared';
import ServerPosition from './utils/server-position';
import PositionsMap from './positions-map';

class ServerInputHandler {
  constructor(
    private player: ServerPlayer,
    private positionsMap: PositionsMap,
  ) {
    this.player = player;
    this.positionsMap = positionsMap;
  }

  public handle(command: AbstractCommand<unknown>): void {
    switch (command.type) {
      case CommandTypeEnum.CLICK:
        this.click();
        break;
      case CommandTypeEnum.MOVE_PLAYER:
        this.movePlayer(command.data as CommandMovePlayerData);
        break;
      default:
        throw new Error('Invalid command');
    }
  }

  private movePlayer(input: CommandMovePlayerData): void {
    const { x, y } = this.player.getPosition();
    let newX = x;
    let newY = y;

    switch (input) {
      case CommandMovePlayerData.A:
        newX -= ServerConfig.GRID_SIZE;
        break;
      case CommandMovePlayerData.S:
        newY += ServerConfig.GRID_SIZE;
        break;
      case CommandMovePlayerData.D:
        newX += ServerConfig.GRID_SIZE;
        break;
      case CommandMovePlayerData.W:
        newY -= ServerConfig.GRID_SIZE;
        break;
      default:
        break;
    }

    this.player.setPosition(new ServerPosition(newX, newY));
    this.positionsMap.clear(new ServerPosition(x, y));
    this.positionsMap.set(this.player);
  }

  private click(): void {
    throw new Error('Method not implemented.');
  }
}

export default ServerInputHandler;
