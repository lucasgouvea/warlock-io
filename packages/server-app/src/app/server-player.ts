import { AbstractPlayer } from '../shared/elements';
import { AbstractProjectile, BallProjectile } from '../shared/elements/projectile';
import { Position } from '../shared/utils';

class ServerPlayer extends AbstractPlayer {
  public shoot(projectiles: AbstractProjectile[]): void {
    const { angleRadians } = this.rightTriangleForStick;
    const {
      position: { end },
      unitVector,
    } = this.stick;

    const ballProjectile = new BallProjectile(
      angleRadians,
      this,
      new Position(end.x, end.y),
      unitVector,
    );

    projectiles.push(ballProjectile);
  }
}

export default ServerPlayer;
