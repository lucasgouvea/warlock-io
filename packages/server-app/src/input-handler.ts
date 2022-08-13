
import Config from './config';
import { Player } from './elements';
import KeyInput from './key-input';
import Position from './position';
import PositionsMap from './map/positions-map';

class InputHandler {
  constructor(
    private player: Player,
    private positionsMap: PositionsMap,
  ) {
    this.player = player;
    this.positionsMap = positionsMap;
  }

  public keyPressed(keyCode: KeyInput): void {
    this.movePlayer(keyCode);
  }

  private movePlayer(input: KeyInput) {
    const { x, y } = this.player.getPosition();
    let newX = x;
    let newY = y;

    switch (input) {
      case KeyInput.A:
        newX -= Config.GRID_SIZE;
        break;
      case KeyInput.S:
        newY += Config.GRID_SIZE;
        break;
      case KeyInput.D:
        newX += Config.GRID_SIZE;
        break;
      case KeyInput.W:
        newY -= Config.GRID_SIZE;
        break;
      default:
        break;
    }

    this.player.setPosition(new Position(newX, newY));
    this.positionsMap.clear(new Position(x, y));
    this.positionsMap.set(this.player);
  }
}

export default InputHandler;
