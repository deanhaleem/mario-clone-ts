import { IEnemy } from '../../game-objects/enemy/types';
import { IProjectile } from '../../game-objects/projectile/types';
import { ICollidable } from '../../physics/types';
import { ICollision, ICollisionResponder } from '../types';

export class EnemyProjectileCollisionResponder implements ICollisionResponder {
  public respondToCollision(
    collisionInstigator: ICollidable,
    collisionReceiver: ICollidable,
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
}
