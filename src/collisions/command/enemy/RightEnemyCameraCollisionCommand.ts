import { IEnemy } from '../../../game-objects/enemy/types';
import { Command } from '../../../input/commands/Command';
import { EnemyCameraCollisionHandler } from '../../handler/EnemyCameraCollisionHandler';

export class RightEnemyCameraCollisionCommand extends Command<EnemyCameraCollisionHandler> {
  constructor(enemy: IEnemy) {
    super(new EnemyCameraCollisionHandler(enemy));
  }

  public override execute(): void {
    this.receiver.handleRightEnemyCameraCollision();
  }
}
