import { IEnemy } from '../../game-objects/enemy/types';
import { physics } from '../../utils/constants/Physics';
import { ICollision } from '../types';

export class EnemyEnemyCollisionHandler {
  private readonly instigatingEnemy: IEnemy;
  private readonly receivingEnemy: IEnemy;
  private readonly collision: ICollision;

  constructor(
    instigatingEnemy: IEnemy,
    receivingEnemy: IEnemy,
    collison: ICollision
  ) {
    this.instigatingEnemy = instigatingEnemy;
    this.receivingEnemy = receivingEnemy;
    this.collision = collison;
  }

  public handleTopEnemyEnemyCollision() {
    this.instigatingEnemy.location.subtract({
      x: 0,
      y: this.collision.intersection.height,
    });
    this.receivingEnemy.location.add({
      x: 0,
      y: this.collision.intersection.height,
    });
  }

  public handleBottomEnemyEnemyCollision() {
    this.instigatingEnemy.location.add({
      x: 0,
      y: this.collision.intersection.height,
    });
    this.receivingEnemy.location.subtract({
      x: 0,
      y: this.collision.intersection.height,
    });
  }

  public handleLeftEnemyEnemyCollision() {
    this.instigatingEnemy.location.add({
      x: this.collision.intersection.width,
      y: 0,
    });
    this.receivingEnemy.location.subtract({
      x: this.collision.intersection.width,
      y: 0,
    });
    this.instigatingEnemy.changeDirection();
    this.receivingEnemy.changeDirection();
  }

  public handleRightEnemyEnemyCollision() {
    this.instigatingEnemy.location.subtract({
      x: this.collision.intersection.width,
      y: 0,
    });
    this.receivingEnemy.location.add({
      x: this.collision.intersection.width,
      y: 0,
    });
    this.instigatingEnemy.changeDirection();
    this.receivingEnemy.changeDirection();
  }

  public handleLeftEnemyShellCollision() {
    if (Math.abs(this.receivingEnemy.velocity.x) >= physics.shellSpeed) {
      this.instigatingEnemy.flip();

      // StatManager.instance.gainPoints(this.collision.intersection, 'handleLeftEnemyShellCollision');
      // SoundManager.instance.playSoundEffect('handleLeftEnemyShellCollision')
    } else {
      this.instigatingEnemy.location.add({
        x: this.collision.intersection.width,
        y: 0,
      });
      this.instigatingEnemy.changeDirection();
    }
  }

  public handleRightEnemyShellCollision() {
    if (Math.abs(this.receivingEnemy.velocity.x) >= physics.shellSpeed) {
      this.instigatingEnemy.flip();

      // StatManager.instance.gainPoints(this.collision.intersection, 'handleLeftEnemyShellCollision');
      // SoundManager.instance.playSoundEffect('handleLeftEnemyShellCollision')
    } else {
      this.instigatingEnemy.location.subtract({
        x: this.collision.intersection.width,
        y: 0,
      });
      this.instigatingEnemy.changeDirection();
    }
  }
}
