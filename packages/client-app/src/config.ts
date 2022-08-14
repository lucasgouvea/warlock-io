import Position from './position';

class Config {
  static CANVAS_WIDTH = 400;

  static CANVAS_HEIGHT = 400;

  static GRID_SIZE = 40;

  static INITIAL_POS_PLAYER = new Position(20, 60);

  static INITIAL_POS_ENEMY = new Position(100, 100);

  static TRIANGLE_HIDDEN = true;
}

export default Config;
