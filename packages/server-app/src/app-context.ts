import PositionsMap from './app/positions-map';

class AppContext {
  private positionsMap: PositionsMap;

  constructor() {
    this.positionsMap = new PositionsMap();
  }

  public getPositionsMap(): PositionsMap {
    return this.positionsMap;
  }
}

export default AppContext;
