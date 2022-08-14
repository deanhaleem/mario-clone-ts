import { IEnemy } from '../../game-objects/enemy/types';
import { ICommand } from '../../input/types';
import { ICollidable } from '../../physics/types';
import { Constructor } from '../../types';
import { PushEnemyDownOtherUpCommand } from '../command/enemy/PushEnemyDownOtherUpCommand';
import { PushEnemyLeftOtherRightCommand } from '../command/enemy/PushEnemyLeftOtherRightCommand';
import { PushEnemyRightOtherLeftCommand } from '../command/enemy/PushEnemyRightOtherLeftCommand';
import { PushEnemyUpOtherDownCommand } from '../command/enemy/PushEnemyUpOtherDownCommand';
import { PushLeftOrKillEnemyCommand } from '../command/enemy/PushLeftOrKillEnemyCommand';
import { PushRightOrKillEnemyCommand } from '../command/enemy/PushRightOrKillEnemyCommand';
import { ICollision, ICollisionResponder } from '../types';

export class EnemyEnemyCollisionResponder implements ICollisionResponder {
  private readonly enemyEnemyCollisionCommands: {
    [key: string]: Constructor<ICommand>;
  };

  public respondToCollision(
    instigatingEnemy: ICollidable,
    receivingEnemy: ICollidable,
    collision: ICollision
  ): void {
    const collisionType = `${
      (instigatingEnemy as IEnemy).enemyState.constructor.name
    },${(receivingEnemy as IEnemy).enemyState.constructor.name},${
      collision.direction
    }`;
    if (this.enemyEnemyCollisionCommands[collisionType]) {
      new this.enemyEnemyCollisionCommands[collisionType](
        instigatingEnemy,
        receivingEnemy,
        collision
      ).execute();
    }
  }

  constructor() {
    this.enemyEnemyCollisionCommands = {
      'WalkingEnemyState,WalkingEnemyState,TopCollision':
        PushEnemyDownOtherUpCommand,
      'WalkingEnemyState,WalkingEnemyState,BottomCollision':
        PushEnemyUpOtherDownCommand,
      'WalkingEnemyState,WalkingEnemyState,LeftCollision':
        PushEnemyRightOtherLeftCommand,
      'WalkingEnemyState,WalkingEnemyState,RightCollision':
        PushEnemyLeftOtherRightCommand,

      'WalkingEnemyState,ShellEnemyState,TopCollision':
        PushEnemyDownOtherUpCommand,
      'WalkingEnemyState,ShellEnemyState,BottomCollision':
        PushEnemyUpOtherDownCommand,
      'WalkingEnemyState,ShellEnemyState,LeftCollision':
        PushRightOrKillEnemyCommand,
      'WalkingEnemyState,ShellEnemyState,RightCollision':
        PushLeftOrKillEnemyCommand,

      'SleepingEnemyState,ShellEnemyState,TopCollision':
        PushEnemyDownOtherUpCommand,
      'SleepingEnemyState,ShellEnemyState,BottomCollision':
        PushEnemyUpOtherDownCommand,
      'SleepingEnemyState,ShellEnemyState,LeftCollision':
        PushRightOrKillEnemyCommand,
      'SleepingEnemyState,ShellEnemyState,RightCollision':
        PushLeftOrKillEnemyCommand,
    };
  }
}
