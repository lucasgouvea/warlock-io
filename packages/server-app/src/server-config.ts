import ServerPosition from './app/utils/server-position';

class ServerConfig {
  static CANVAS_WIDTH = 400;

  static CANVAS_HEIGHT = 400;

  static GRID_SIZE = 40;

  static INITIAL_POS_PLAYER = new ServerPosition(60, 60);

  static INITIAL_POS_ENEMY = new ServerPosition(100, 100);
}

export default ServerConfig;
