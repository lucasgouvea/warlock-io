import Player from './elements/player';
import Position from './position';
import PositionsMap from './map/positions-map';
import Config from './config';
import InputHandler from './input-handler';
import Enemy from './elements/enemy';

class App {
  private player: Player;

  private enemy: Enemy;

  private positionsMap: PositionsMap;

  private p5: p5;

  private inputHandler: InputHandler;

  constructor(p5: p5) {
    this.player = new Player(Config.INITIAL_POS_PLAYER, p5);
    this.enemy = new Enemy(Config.INITIAL_POS_ENEMY, p5);
    this.positionsMap = new PositionsMap(
      Config.CANVAS_WIDTH,
      Config.CANVAS_HEIGHT,
      Config.GRID_SIZE,
      p5,
    );
    this.p5 = p5;
    this.inputHandler = new InputHandler(p5, this.player, this.positionsMap);
  }

  public setup(p: p5): void {
    const canvas = p.createCanvas(Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT);
    canvas.parent('sketch-holder');
    this.positionsMap.set(this.player);
    this.positionsMap.set(this.enemy);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.onmousemove = (e) => {
      const position = new Position(e.x - 440, e.y - 140);
      this.player.setMousePosition(position);
    };
  }

  public draw(): void {
    this.drawGrid();
    this.drawMapElements();
    for (const {
      position: { x, y },
    } of this.player.getProjectiles()) {
      this.p5.circle(x, y, 10);
    }
    this.player.updateProjectiles();
  }

  private drawGrid(): void {
    this.p5.background(220);
    this.p5.stroke(0);
    this.p5.strokeWeight(1);

    for (let x = 0; x < Config.CANVAS_WIDTH; x += Config.GRID_SIZE) {
      this.p5.line(x, 0, x, Config.CANVAS_HEIGHT);
    }

    for (let y = 0; y < Config.CANVAS_HEIGHT; y += Config.GRID_SIZE) {
      this.p5.line(0, y, Config.CANVAS_WIDTH, y);
    }
  }

  private drawMapElements(): void {
    const projectiles = this.player.getProjectiles();
    for (const [key, cell] of this.positionsMap.getMap()) {
      if (cell !== null) {
        this.player.draw();
        this.player.drawArm();
        this.enemy.draw();
      }
      cell.draw(projectiles);
    }
  }

  public keyPressed(): void {
    this.inputHandler.keyPressed();
  }

  public getPlayer(): Player {
    return this.player;
  }
}

export default App;
