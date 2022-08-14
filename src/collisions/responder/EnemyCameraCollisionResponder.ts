import { IEnemy } from '../../game-objects/enemy/types';
import { ICollidable } from '../../physics/types';
import { ICollision } from '../types';

export function respondToEnemyCameraCollision(
  enemy: ICollidable,
  camera: ICollidable,
  collision: ICollision
): void {
  if (enemyCameraCollisionCommands[`${collision.direction}`]) {
    enemyCameraCollisionCommands[`${collision.direction}`](enemy as IEnemy);
  }
}

function handleRightEnemyCameraCollision(enemy: IEnemy) {
  enemy.wakeUp();
}

const enemyCameraCollisionCommands: {
  [key: string]: (enemy: IEnemy) => void;
} = {
  RightCollision: handleRightEnemyCameraCollision,
};
