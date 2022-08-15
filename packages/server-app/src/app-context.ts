import { RawData } from 'ws';
import { Player } from './app/elements';
import InputHandler from './app/input-handler';
import KeyInput from './app/key-input';
import Position from './app/position';
import PositionsMap from './app/positions-map';

class AppContext {
  private inputHandler: InputHandler;

  private player: Player;

  private positionsMap: PositionsMap;

  constructor() {
    this.player = new Player(new Position(100, 100));
    this.positionsMap = new PositionsMap();
    this.positionsMap.set(this.player);
    this.inputHandler = new InputHandler(this.player, this.positionsMap);
  }

  public serialize(): string {
    const obj = Object.fromEntries(this.positionsMap.getMap());
    return JSON.stringify(obj);
  }

  public handle(data: RawData): void {
    const { command, input } = JSON.parse(data.toString()) as {
      command: string;
      input: KeyInput;
    };

    this.inputHandler.keyPressed(input);
  }
}

export default AppContext;
