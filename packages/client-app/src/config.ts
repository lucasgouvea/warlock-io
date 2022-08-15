import ClientPosition from './utils/client-position';

class Config {
  static CANVAS_WIDTH = 400;

  static CANVAS_HEIGHT = 400;

  static GRID_SIZE = 40;

  static INITIAL_POS_PLAYER = new ClientPosition(20, 60);

  static INITIAL_POS_ENEMY = new ClientPosition(100, 100);

  static TRIANGLE_HIDDEN = true;
}

export default Config;
