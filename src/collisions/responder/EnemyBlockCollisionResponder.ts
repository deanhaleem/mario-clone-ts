import { ICommand } from '../../input/types';
import { ICollidable } from '../../physics/types';
import { Constructor } from '../../types';
import { PushEnemyDownCommand } from '../command/enemy/PushEnemyDownCommand';
import { PushEnemyLeftCommand } from '../command/enemy/PushEnemyLeftCommand';
import { PushEnemyRightCommand } from '../command/enemy/PushEnemyRightCommand';
import { PushEnemyUpCommand } from '../command/enemy/PushEnemyUpCommand';
import { ICollision, ICollisionResponder } from '../types';

export class EnemyBlockCollisionResponder implements ICollisionResponder {
  private readonly enemyBlockCollisionCommands: {
    [key: string]: Constructor<ICommand>;
  };

  public respondToCollision(
    enemy: ICollidable,
    block: ICollidable,
    collision: ICollision
  ): void {
    if (
      this.enemyBlockCollisionCommands[
        `${enemy.collisionDetails.interface},${block.collisionDetails.class},${collision.direction}`
      ]
    ) {
      new this.enemyBlockCollisionCommands[
        `${enemy.collisionDetails.interface},${block.collisionDetails.class},${collision.direction}`
      ](enemy, block, collision).execute();
    }
  }

  constructor() {
    this.enemyBlockCollisionCommands = {
      'IEnemy,ItemBrickBlock,TopCollison': PushEnemyUpCommand,
      'IEnemy,ItemBrickBlock,BottomCollison': PushEnemyDownCommand,
      'IEnemy,ItemBrickBlock,LeftCollison': PushEnemyRightCommand,
      'IEnemy,ItemBrickBlock,RightCollison': PushEnemyLeftCommand,

      'IEnemy,BrickBlock,TopCollison': PushEnemyUpCommand,
      'IEnemy,BrickBlock,BottomCollison': PushEnemyDownCommand,
      'IEnemy,BrickBlock,LeftCollison': PushEnemyRightCommand,
      'IEnemy,BrickBlock,RightCollison': PushEnemyLeftCommand,

      'IEnemy,NonPowerUpQuestionBlock,TopCollison': PushEnemyUpCommand,
      'IEnemy,NonPowerUpQuestionBlock,BottomCollison': PushEnemyDownCommand,
      'IEnemy,NonPowerUpQuestionBlock,LeftCollison': PushEnemyRightCommand,
      'IEnemy,NonPowerUpQuestionBlock,RightCollison': PushEnemyLeftCommand,

      'IEnemy,PowerUpQuestionBlock,TopCollison': PushEnemyUpCommand,
      'IEnemy,PowerUpQuestionBlock,BottomCollison': PushEnemyDownCommand,
      'IEnemy,PowerUpQuestionBlock,LeftCollison': PushEnemyRightCommand,
      'IEnemy,PowerUpQuestionBlock,RightCollison': PushEnemyLeftCommand,

      'IEnemy,FloorBlock,TopCollison': PushEnemyUpCommand,
      'IEnemy,FloorBlock,BottomCollison': PushEnemyDownCommand,
      'IEnemy,FloorBlock,LeftCollison': PushEnemyRightCommand,
      'IEnemy,FloorBlock,RightCollison': PushEnemyLeftCommand,

      'IEnemy,StairBlock,TopCollison': PushEnemyUpCommand,
      'IEnemy,StairBlock,BottomCollison': PushEnemyDownCommand,
      'IEnemy,StairBlock,LeftCollison': PushEnemyRightCommand,
      'IEnemy,StairBlock,RightCollison': PushEnemyLeftCommand,

      'IEnemy,UsedBlock,TopCollison': PushEnemyUpCommand,
      'IEnemy,UsedBlock,BottomCollison': PushEnemyDownCommand,
      'IEnemy,UsedBlock,LeftCollison': PushEnemyRightCommand,
      'IEnemy,UsedBlock,RightCollison': PushEnemyLeftCommand,

      'IEnemy,SmallVerticalGreenPipe,TopCollison': PushEnemyUpCommand,
      'IEnemy,SmallVerticalGreenPipe,BottomCollison': PushEnemyDownCommand,
      'IEnemy,SmallVerticalGreenPipe,LeftCollison': PushEnemyRightCommand,
      'IEnemy,SmallVerticalGreenPipe,RightCollison': PushEnemyLeftCommand,

      'IEnemy,MediumVerticalGreenPipe,TopCollison': PushEnemyUpCommand,
      'IEnemy,MediumVerticalGreenPipe,BottomCollison': PushEnemyDownCommand,
      'IEnemy,MediumVerticalGreenPipe,LeftCollison': PushEnemyRightCommand,
      'IEnemy,MediumVerticalGreenPipe,RightCollison': PushEnemyLeftCommand,

      'IEnemy,LargeVerticalGreenPipe,TopCollison': PushEnemyUpCommand,
      'IEnemy,LargeVerticalGreenPipe,BottomCollison': PushEnemyDownCommand,
      'IEnemy,LargeVerticalGreenPipe,LeftCollison': PushEnemyRightCommand,
      'IEnemy,LargeVerticalGreenPipe,RightCollison': PushEnemyLeftCommand,
    };
  }
}
