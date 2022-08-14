import { Player } from './app/elements';
import Position from './app/position';
import PositionsMap from './app/positions-map';

class AppContext {
  private positionsMap: PositionsMap;

  constructor() {
    this.positionsMap = new PositionsMap();
    this.positionsMap.set(new Player(new Position(20, 20)));
  }

  public serialize(): string {
    const obj = Object.fromEntries(this.positionsMap.getMap());

    return JSON.stringify(obj);
  }
}

export default AppContext;
