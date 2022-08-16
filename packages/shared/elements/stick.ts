import { Position, UnitVector } from '../utils';

class Stick {
  public position: {
    start: Position;
    end: Position;
  };

  public unitVector: UnitVector;

  constructor(
    startPosition: Position,
    endPosition: Position,
    unitVector: UnitVector,
  ) {
    this.position = {
      start: startPosition,
      end: endPosition,
    };

    this.unitVector = unitVector;
  }
}

export default Stick;
