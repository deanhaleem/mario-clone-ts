import { IEnemy } from '../../../game-objects/enemy/types';
import { Command } from '../../../input/commands/Command';
import { EnemyEnemyCollisionHandler } from '../../handler/EnemyEnemyCollisionHandler';
import { ICollision } from '../../types';

export class PushEnemyRightOtherLeftCommand extends Command<EnemyEnemyCollisionHandler> {
  constructor(
    instigatingEnemy: IEnemy,
    receivingEnemy: IEnemy,
    collision: ICollision
  ) {
    super(
      new EnemyEnemyCollisionHandler(
        instigatingEnemy,
        receivingEnemy,
        collision
      )
    );
  }

  public override execute(): void {
    this.receiver.handleLeftEnemyEnemyCollision();
  }
}
