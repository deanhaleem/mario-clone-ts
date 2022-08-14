import { IEnemy } from '../../game-objects/enemy/types';
import { IPlayer } from '../../game-objects/player/types';
import { physics } from '../../utils/constants/Physics';
import { ICollision } from '../types';

export class PlayerEnemyCollisionHandler {
  private readonly player: IPlayer;
  private readonly enemy: IEnemy;
  private readonly collision: ICollision;

  constructor(player: IPlayer, enemy: IEnemy, collision: ICollision) {
    this.player = player;
    this.enemy = enemy;
    this.collision = collision;
  }

  public handleTopPlayerEnemyCollision() {
    this.player.location.subtract({
      x: 0,
      y: this.collision.intersection.height,
    });
    this.player.applyImpulse(
      physics.bumpEnemyForce.subtract({ x: 0, y: this.player.velocity.y })
    );
    this.enemy.stomp();

    // StatManager.instance.gainPoints(this.collision.intersection, 'handleTopPlayerEnemyCollision')
    // SoundManager.instance.playSoundEffect('handleTopPlayerEnemyCollision')
  }

  public handleNonTopPlayerEnemyCollision() {
    this.player.takeDamage();
  }

  public handleFlippingPlayerEnemyCollision() {
    this.enemy.flip();

    // StatManager.instance.gainPoints(this.collision.intersection, 'handleFlippingPlayerEnemyCollision');
    // SoundManager.instance.playSoundEffect('handleFlippingPlayerEnemyCollision')
  }

  public handleDisarmingPlayerEnemyCollision() {
    this.player.location.subtract({
      x: 0,
      y: this.collision.intersection.height,
    });
    this.player.applyImpulse(
      physics.bumpEnemyForce.subtract({ x: 0, y: this.player.velocity.y })
    );
    this.enemy.disarm();

    // StatManager.instance.gainPoints(this.collision.intersection, 'handleDisarmingPlayerEnemyCollision');
    // SoundManager.instance.playSoundEffect('handleDisarmingPlayerEnemyCollision')
  }

  public handleTopPlayerShellCollision() {
    this.player.location.subtract({
      x: 0,
      y: this.collision.intersection.height,
    });
    this.player.applyImpulse(
      physics.bumpEnemyForce.subtract({ x: 0, y: this.player.velocity.y })
    );

    if (Math.abs(this.enemy.velocity.x) >= physics.shellSpeed) {
      this.enemy.stomp();
    } else {
      this.enemy.applyImpulse(
        this.player.hitbox.centerX > this.enemy.hitbox.centerX
          ? new Phaser.Math.Vector2(-physics.shellSpeed, 0)
          : new Phaser.Math.Vector2(physics.shellSpeed, 0)
      );
    }

    // StatManager.instance.gainPoints(this.collision.intersection, 'handleTopPlayerShellCollision');
    // SoundManager.instance.playSoundEffect('handleTopPlayerShellCollision')
  }

  public handleLeftPlayerShellCollision() {
    this.player.location.add({
      x: this.collision.intersection.width,
      y: 0,
    });

    if (Math.abs(this.enemy.velocity.x) >= physics.shellSpeed) {
      this.player.takeDamage();
    } else {
      this.enemy.applyImpulse(new Phaser.Math.Vector2(-physics.shellSpeed, 0));
    }

    // StatManager.instance.gainPoints(this.collision.intersection, 'handleLeftPlayerShellCollision');
    // SoundManager.instance.playSoundEffect('handleLeftPlayerShellCollision')
  }

  public handleRightPlayerShellCollision() {
    this.player.location.subtract({
      x: this.collision.intersection.width,
      y: 0,
    });

    if (Math.abs(this.enemy.velocity.x) >= physics.shellSpeed) {
      this.player.takeDamage();
    } else {
      this.enemy.applyImpulse(new Phaser.Math.Vector2(physics.shellSpeed, 0));
    }

    // StatManager.instance.gainPoints(this.collision.intersection, 'handleLeftPlayerShellCollision');
    // SoundManager.instance.playSoundEffect('handleLeftPlayerShellCollision')
  }
}
