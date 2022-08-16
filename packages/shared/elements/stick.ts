import { Position, UnitVector } from '../utils';

class Stick {
  public position: Position;

  public unitVector: UnitVector;

  constructor(position: Position, unitVector: UnitVector) {
    this.position = position;
    this.unitVector = unitVector;
  }
}

export default Stick;
