import ServerPosition from '../utils/server-position';
import Element from './element';
import ElementTypeEnum from './element-type-enum';

class Enemy extends Element {
  readonly type = ElementTypeEnum.ENEMY;

  private hp: number;

  constructor(position: ServerPosition) {
    super(position);
    this.hp = 10;
  }
}

export default Enemy;
