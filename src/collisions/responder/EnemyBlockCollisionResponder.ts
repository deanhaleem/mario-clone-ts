import { IBlock } from '../../game-objects/block/types';
import { IEnemy } from '../../game-objects/enemy/types';
import { ICollidable } from '../../physics/types';
import { ICollision } from '../types';

export function respondToEnemyBlockCollision(
  enemy: ICollidable,
  block: ICollidable,
  collision: ICollision
): void {
  if (
    enemyBlockCollisionCommands[
      `${enemy.collisionDetails.interface},${block.collisionDetails.class},${collision.direction}`
    ]
  ) {
    enemyBlockCollisionCommands[
      `${enemy.collisionDetails.interface},${block.collisionDetails.class},${collision.direction}`
    ](enemy as IEnemy, block as IBlock, collision);
  }
}

function handleTopEnemyBlockCollision(
  enemy: IEnemy,
  block: IBlock,
  collision: ICollision
) {
  enemy.location.subtract(
    new Phaser.Math.Vector2(0, collision.intersection.height)
  );
  enemy.land();

  if (
    block.blockState.constructor.name === 'BumpedBlockState' ||
    block.blockState.constructor.name === 'DestroyedBlockState'
  ) {
    enemy.flip();

    // StatManager.instance.gainPoints(collison.intersection, 'handleTopEnemyBlockCollision');
    // SoundManager.instance.playSoundEffect('handleTopEnemyBlockCollision');
  }
}

function handleBottomEnemyBlockCollision(
  enemy: IEnemy,
  block: IBlock,
  collision: ICollision
) {
  enemy.location.add(new Phaser.Math.Vector2(0, collision.intersection.height));
}

function handleLeftEnemyBlockCollision(
  enemy: IEnemy,
  block: IBlock,
  collision: ICollision
) {
  enemy.location.add(new Phaser.Math.Vector2(collision.intersection.width, 0));
  enemy.changeDirection();
}

function handleRightEnemyBlockCollision(
  enemy: IEnemy,
  block: IBlock,
  collision: ICollision
) {
  enemy.location.subtract(
    new Phaser.Math.Vector2(collision.intersection.width, 0)
  );
  enemy.changeDirection();
}

const enemyBlockCollisionCommands: {
  [key: string]: (enemy: IEnemy, block: IBlock, collision: ICollision) => void;
} = {
  'IEnemy,ItemBrickBlock,TopCollison': handleTopEnemyBlockCollision,
  'IEnemy,ItemBrickBlock,BottomCollison': handleBottomEnemyBlockCollision,
  'IEnemy,ItemBrickBlock,LeftCollison': handleLeftEnemyBlockCollision,
  'IEnemy,ItemBrickBlock,RightCollison': handleRightEnemyBlockCollision,

  'IEnemy,BrickBlock,TopCollison': handleTopEnemyBlockCollision,
  'IEnemy,BrickBlock,BottomCollison': handleBottomEnemyBlockCollision,
  'IEnemy,BrickBlock,LeftCollison': handleLeftEnemyBlockCollision,
  'IEnemy,BrickBlock,RightCollison': handleRightEnemyBlockCollision,

  'IEnemy,NonPowerUpQuestionBlock,TopCollison': handleTopEnemyBlockCollision,
  'IEnemy,NonPowerUpQuestionBlock,BottomCollison':
    handleBottomEnemyBlockCollision,
  'IEnemy,NonPowerUpQuestionBlock,LeftCollison': handleLeftEnemyBlockCollision,
  'IEnemy,NonPowerUpQuestionBlock,RightCollison':
    handleRightEnemyBlockCollision,

  'IEnemy,PowerUpQuestionBlock,TopCollison': handleTopEnemyBlockCollision,
  'IEnemy,PowerUpQuestionBlock,BottomCollison': handleBottomEnemyBlockCollision,
  'IEnemy,PowerUpQuestionBlock,LeftCollison': handleLeftEnemyBlockCollision,
  'IEnemy,PowerUpQuestionBlock,RightCollison': handleRightEnemyBlockCollision,

  'IEnemy,FloorBlock,TopCollison': handleTopEnemyBlockCollision,
  'IEnemy,FloorBlock,BottomCollison': handleBottomEnemyBlockCollision,
  'IEnemy,FloorBlock,LeftCollison': handleLeftEnemyBlockCollision,
  'IEnemy,FloorBlock,RightCollison': handleRightEnemyBlockCollision,

  'IEnemy,StairBlock,TopCollison': handleTopEnemyBlockCollision,
  'IEnemy,StairBlock,BottomCollison': handleBottomEnemyBlockCollision,
  'IEnemy,StairBlock,LeftCollison': handleLeftEnemyBlockCollision,
  'IEnemy,StairBlock,RightCollison': handleRightEnemyBlockCollision,

  'IEnemy,UsedBlock,TopCollison': handleTopEnemyBlockCollision,
  'IEnemy,UsedBlock,BottomCollison': handleBottomEnemyBlockCollision,
  'IEnemy,UsedBlock,LeftCollison': handleLeftEnemyBlockCollision,
  'IEnemy,UsedBlock,RightCollison': handleRightEnemyBlockCollision,

  'IEnemy,SmallVerticalGreenPipe,TopCollison': handleTopEnemyBlockCollision,
  'IEnemy,SmallVerticalGreenPipe,BottomCollison':
    handleBottomEnemyBlockCollision,
  'IEnemy,SmallVerticalGreenPipe,LeftCollison': handleLeftEnemyBlockCollision,
  'IEnemy,SmallVerticalGreenPipe,RightCollison': handleRightEnemyBlockCollision,

  'IEnemy,MediumVerticalGreenPipe,TopCollison': handleTopEnemyBlockCollision,
  'IEnemy,MediumVerticalGreenPipe,BottomCollison':
    handleBottomEnemyBlockCollision,
  'IEnemy,MediumVerticalGreenPipe,LeftCollison': handleLeftEnemyBlockCollision,
  'IEnemy,MediumVerticalGreenPipe,RightCollison':
    handleRightEnemyBlockCollision,

  'IEnemy,LargeVerticalGreenPipe,TopCollison': handleTopEnemyBlockCollision,
  'IEnemy,LargeVerticalGreenPipe,BottomCollison':
    handleBottomEnemyBlockCollision,
  'IEnemy,LargeVerticalGreenPipe,LeftCollison': handleLeftEnemyBlockCollision,
  'IEnemy,LargeVerticalGreenPipe,RightCollison': handleRightEnemyBlockCollision,
};
