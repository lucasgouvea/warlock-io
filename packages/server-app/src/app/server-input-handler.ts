import { SharedConfig } from '../shared';
import ServerPlayer from './server-player';
import {
  AbstractCommand, CommandMovePlayerData, CommandMoveMouseData, CommandTypeEnum,
} from '../shared/commands';
import PositionsMap from './positions-map';
import { Position } from '../shared/utils';

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
      case CommandTypeEnum.MOVE_MOUSE:
        this.movePlayerMouse(command.data as CommandMoveMouseData);
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
        newX -= SharedConfig.GRID_SIZE;
        break;
      case CommandMovePlayerData.S:
        newY += SharedConfig.GRID_SIZE;
        break;
      case CommandMovePlayerData.D:
        newX += SharedConfig.GRID_SIZE;
        break;
      case CommandMovePlayerData.W:
        newY -= SharedConfig.GRID_SIZE;
        break;
      default:
        break;
    }

    this.player.setPosition(new Position(newX, newY));
    this.positionsMap.clear(new Position(x, y));
    this.positionsMap.set(this.player);
  }

  private movePlayerMouse(input: CommandMoveMouseData): void {
    this.player.setMousePosition(input as Position);
  }

  private click(): void {
    throw new Error('Method not implemented.');
  }
}

export default ServerInputHandler;
