import { IProjectile } from '../../game-objects/projectile/types';
import { ICollidable } from '../../physics/types';
import { ICollision } from '../types';

export function respondToProjectileBlockCollision(
  projectile: ICollidable,
  block: ICollidable,
  collision: ICollision
): void {
  if (projectileBlockCollisionCommands[`${collision.direction}`]) {
    projectileBlockCollisionCommands[`${collision.direction}`](
      projectile as IProjectile,
      collision
    );
  }
}

export function handleTopProjectileBlockCollision(
  projectile: IProjectile,
  collision: ICollision
) {
  projectile.location.subtract({
    x: 0,
    y: collision.intersection.height,
  });
  projectile.land();
}

export function handleBottomProjectileBlockCollision(
  projectile: IProjectile,
  collision: ICollision
) {
  projectile.location.add({
    x: 0,
    y: collision.intersection.height,
  });
}

export function handleLeftProjectileBlockCollision(
  projectile: IProjectile,
  collision: ICollision
) {
  projectile.location.subtract({
    x: collision.intersection.width,
    y: 0,
  });
  projectile.destroy();
}

export function handleRightProjectileBlockCollision(
  projectile: IProjectile,
  collision: ICollision
) {
  projectile.location.add({
    x: collision.intersection.width,
    y: 0,
  });
  projectile.destroy();
}

const projectileBlockCollisionCommands: {
  [key: string]: (projectile: IProjectile, collision: ICollision) => void;
} = {
  TopCollision: handleTopProjectileBlockCollision,
  BottomCollision: handleBottomProjectileBlockCollision,
  LeftCollision: handleLeftProjectileBlockCollision,
  RightCollision: handleRightProjectileBlockCollision,
};
