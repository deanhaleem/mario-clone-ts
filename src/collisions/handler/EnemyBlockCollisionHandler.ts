import { IBlock } from '../../game-objects/block/types';
import { IEnemy } from '../../game-objects/enemy/types';
import { ICollision } from '../types';

export class EnemyBlockCollisionHandler {
  private readonly enemy: IEnemy;
  private readonly block: IBlock;
  private readonly collision: ICollision;

  constructor(enemy: IEnemy, block: IBlock, collision: ICollision) {
    this.enemy = enemy;
    this.block = block;
    this.collision = collision;
  }

  public handleTopEnemyBlockCollision() {
    this.enemy.location.subtract(
      new Phaser.Math.Vector2(0, this.collision.intersection.height)
    );
    this.enemy.land();

    if (
      this.block.blockState.constructor.name === 'BumpedBlockState' ||
      this.block.blockState.constructor.name === 'DestroyedBlockState'
    ) {
      this.enemy.flip();

      // StatManager.instance.gainPoints(this.collison.intersection, 'handleTopEnemyBlockCollision');
      // SoundManager.instance.playSoundEffect('handleTopEnemyBlockCollision');
    }
  }

  public handleBottomEnemyBlockCollision() {
    this.enemy.location.add(
      new Phaser.Math.Vector2(0, this.collision.intersection.height)
    );
  }

  public handleLeftEnemyBlockCollision() {
    this.enemy.location.add(
      new Phaser.Math.Vector2(this.collision.intersection.width, 0)
    );
    this.enemy.changeDirection();
  }

  public handleRightEnemyBlockCollision() {
    this.enemy.location.subtract(
      new Phaser.Math.Vector2(this.collision.intersection.width, 0)
    );
    this.enemy.changeDirection();
  }
}
