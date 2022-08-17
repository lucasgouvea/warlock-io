import P5 from 'p5';

import { ClientPlayer } from '../elements';
import ClientCell from './client-cell';
import { SharedConfig } from '../shared';
import { Position } from '../shared/utils';
import { AbstractPlayer, Cell, ElementTypeEnum } from '../shared/elements';
import { AbstractProjectile } from '../shared/elements/projectile';
import { ClientBallProjectile } from '../projectiles';

class PositionsMap {
  private map: Map<string, ClientCell>;

  private projectiles: ClientBallProjectile[];

  private p5: P5;

  constructor(p5: P5) {
    this.map = new Map();
    this.p5 = p5;
    for (
      let x = 0;
      x < SharedConfig.CANVAS_WIDTH;
      x += SharedConfig.GRID_SIZE
    ) {
      for (
        let y = 0;
        y < SharedConfig.CANVAS_HEIGHT;
        y += SharedConfig.GRID_SIZE
      ) {
        const centerX = x + SharedConfig.GRID_SIZE / 2;
        const centerY = y + SharedConfig.GRID_SIZE / 2;
        this.init(new Position(centerX, centerY));
      }
    }
  }

  public init(position: Position): void {
    this.map.set(
      `${position.x},${position.y}`,
      new ClientCell(null, position, this.p5),
    );
  }

  public parseMap(map: object, player: ClientPlayer): void {
    for (const [key, _cell] of Object.entries(map) as [string, Cell][]) {
      const cell = this.map.get(key);
      if (_cell?.element?.type === ElementTypeEnum.PLAYER) {
        const serverPlayer = _cell?.element as AbstractPlayer;
        player.setPosition(serverPlayer.position);
        // eslint-disable-next-line no-param-reassign
        player.stick = serverPlayer.stick;
      }
      cell.set(_cell, player);
    }
  }

  public parseProjectiles(projectiles: AbstractProjectile[]): void {
    this.projectiles = projectiles.map(
      ({
        angleRadians, originElement, position, unitVector,
      }) => new ClientBallProjectile(
        angleRadians,
        originElement,
        position,
        unitVector,
        this.p5,
      ),
    );
  }

  public getMap(): Map<string, ClientCell> {
    return this.map;
  }

  public getProjectiles(): ClientBallProjectile[] {
    return this.projectiles;
  }
}

export default PositionsMap;
