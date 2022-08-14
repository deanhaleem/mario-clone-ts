import { IEnemy } from '../../game-objects/enemy/types';

export class EnemyCameraCollisionHandler {
  private readonly enemy: IEnemy;

  constructor(enemy: IEnemy) {
    this.enemy = enemy;
  }

  public handleRightEnemyCameraCollision() {
    this.enemy.wakeUp();
  }
}
