import { IEnemy } from '../../game-objects/enemy/types';
import { IProjectile } from '../../game-objects/projectile/types';
import { ICollidable } from '../../physics/types';
import { ICollision } from '../types';

export function respondToEnemyProjectileCollision(
  collisionInstigator: ICollidable,
  collisionReceiver: ICollidable,
  // TODO: possible to remove this?
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  collisionSide: ICollision
): void {
  if (collisionInstigator.collisionDetails.interface === 'IEnemy') {
    (collisionInstigator as IEnemy).flip();
    (collisionReceiver as IProjectile).destroy();
  } else {
    (collisionReceiver as IEnemy).flip();
    (collisionInstigator as IProjectile).destroy();
  }

  // StatManager.instance.gainPoints(collision.intersection, ``);
  // SoundManager.instance.playSoundEffect();
}
