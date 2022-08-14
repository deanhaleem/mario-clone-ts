import { IBlock } from '../../../game-objects/block/types';
import { IEnemy } from '../../../game-objects/enemy/types';
import { Command } from '../../../input/commands/Command';
import { EnemyBlockCollisionHandler } from '../../handler/EnemyBlockCollisionHandler';
import { ICollision } from '../../types';

export class PushEnemyUpCommand extends Command<EnemyBlockCollisionHandler> {
  constructor(enemy: IEnemy, block: IBlock, collision: ICollision) {
    super(new EnemyBlockCollisionHandler(enemy, block, collision));
  }

  public override execute(): void {
    this.receiver.handleTopEnemyBlockCollision();
  }
}
