import { SharedConfig } from '../shared';
import ServerPlayer from './server-player';
import {
  AbstractCommand, CommandMovePlayerData, CommandMoveMouseData, CommandTypeEnum,
} from '../shared/commands';
import PositionsMap from './positions-map';
import { Position } from '../shared/utils';
import { AbstractProjectile } from '../shared/elements/projectile';

class ServerInputHandler {
  constructor(
    private player: ServerPlayer,
    private positionsMap: PositionsMap,
    private projectiles: AbstractProjectile[],
  ) {
    this.player = player;
    this.positionsMap = positionsMap;
    this.projectiles = projectiles;
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
    this.player.setMousePosition(this.player.mousePosition); // to move stick together
  }

  private movePlayerMouse(input: CommandMoveMouseData): void {
    this.player.setMousePosition(input as Position);
  }

  private click(): void {
    this.player.shoot(this.projectiles);
  }
}

export default ServerInputHandler;
