import ServerConfig from "../server-config";
import { Player } from './elements';
import KeyInput from './key-input';
import ServerPosition from './utils/server-position';
import PositionsMap from './positions-map';

class ServerInputHandler {
  constructor(private player: Player, private positionsMap: PositionsMap) {
    this.player = player;
    this.positionsMap = positionsMap;
  }

  public handle(command: string, input: KeyInput) {
    switch (command) {
      case 'move':
        this.movePlayer(input);
        break;
      case 'click':
        this.click();
        break;
      default:
        throw new Error('Invalid command');
    }
  }

  private movePlayer(input: KeyInput) {
    const { x, y } = this.player.getPosition();
    let newX = x;
    let newY = y;

    switch (input) {
      case KeyInput.A:
        newX -= ServerConfig.GRID_SIZE;
        break;
      case KeyInput.S:
        newY += ServerConfig.GRID_SIZE;
        break;
      case KeyInput.D:
        newX += ServerConfig.GRID_SIZE;
        break;
      case KeyInput.W:
        newY -= ServerConfig.GRID_SIZE;
        break;
      default:
        break;
    }

    this.player.setPosition(new ServerPosition(newX, newY));
    this.positionsMap.clear(new ServerPosition(x, y));
    this.positionsMap.set(this.player);
  }

  private click() {
    throw new Error('Method not implemented.');
  }
}

export default ServerInputHandler;
