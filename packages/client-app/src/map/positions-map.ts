import P5 from 'p5';

import { ClientPlayer } from '../elements';
import ClientCell from './client-cell';
import { SharedConfig } from '../shared';
import { Position } from '../shared/utils';
import { AbstractPlayer, Cell, ElementTypeEnum } from '../shared/elements';

class PositionsMap {
  private map: Map<string, ClientCell>;

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

  public parseMap(event: MessageEvent<string>, player: ClientPlayer): void {
    const object = JSON.parse(event.data);
    for (const [key, _cell] of (Object.entries(object) as [string, Cell][])) {
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

  public getMap(): Map<string, ClientCell> {
    return this.map;
  }
}

export default PositionsMap;
