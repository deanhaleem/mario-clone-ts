import { IBlock, IItemContainer } from '../../game-objects/block/types';
import { FireFlower } from '../../game-objects/item/FireFlower';
import { IPlayer } from '../../game-objects/player/types';
import { physics } from '../../utils/constants/Physics';
import { ICollision } from '../types';

export class PlayerBlockCollisionHandler {
  private readonly player: IPlayer;
  private readonly block: IBlock;
  private readonly collison: ICollision;

  constructor(player: IPlayer, block: IBlock, collison: ICollision) {
    this.player = player;
    this.block = block;
    this.collison = collison;
  }

  public handleTopPlayerBlockCollison() {
    this.player.location.subtract({
      x: 0,
      y: this.collison.intersection.height,
    });

    // console.log(this.player.actionState);

    if (this.player.actionState.constructor.name === 'FallingActionState') {
      this.player.land();
      this.player.cutYVelocity();

      // StatManager.instance.resetConsecutivePoints();
    }
  }

  public handleBottomPlayerBlockCollision() {
    this.player.location.add({
      x: 0,
      y: this.collison.intersection.height,
    });

    if (this.player.actionState.constructor.name === 'JumpingActionState') {
      this.player.location.add({
        x: 0,
        y: this.collison.intersection.height,
      });
      this.player.applyImpulse(
        physics.blockBumpForce.subtract({ x: 0, y: this.player.velocity.y })
      );
      this.block.bump();

      // StatManager.instance.playSoundEffect('handleBottomPlayerBlockCollision');
    }
  }

  public handleLeftPlayerBlockCollision() {
    this.player.location.add({
      x: this.collison.intersection.width,
      y: 0,
    });

    if (this.player.velocity.x < 0) {
      this.player.cutXVelocity();
    }
  }

  public handleRightPlayerBlockCollision() {
    this.player.location.subtract({
      x: this.collison.intersection.width,
      y: 0,
    });

    if (this.player.velocity.x > 0) {
      this.player.cutXVelocity();
    }
  }

  public handleBottomNonSmallPlayerPowerUpBlockCollision() {
    this.player.location.add({
      x: 0,
      y: this.collison.intersection.height,
    });

    if (this.player.actionState.constructor.name === 'JumpingActionState') {
      this.player.applyImpulse(
        physics.blockBumpForce.subtract({ x: 0, y: this.player.velocity.y })
      );
      (this.block as IItemContainer).itemType = FireFlower;
      this.block.bump();

      // SoundManager.instance.playSoundEffect('handleBottomNonSmallPlayerPowerUpBlockCollision')
    }
  }

  public handleBottomPlayerHiddenBlockCollision() {
    this.player.location.add({
      x: 0,
      y: this.collison.intersection.height,
    });

    if (this.player.actionState.constructor.name === 'JumpingActionState') {
      this.player.applyImpulse(
        physics.blockBumpForce.subtract({ x: 0, y: this.player.velocity.y })
      );
      this.block.bump();

      // SoundManager.instance.playSoundEffect('handleBottomPlayerHiddenBlockCollision')
    }
  }

  public handleDestroyingPlayerBlockCollision() {
    this.player.location.add({
      x: 0,
      y: this.collison.intersection.height,
    });

    if (this.player.actionState.constructor.name === 'JumpingActionState') {
      this.player.applyImpulse(
        physics.blockBumpForce.subtract({ x: 0, y: this.player.velocity.y })
      );
      this.block.destroy();

      // StatManager.instance.gainPoints(this.collision.intersection, 'handleDestroyingPlayerBlockCollision');
      // SoundManager.instance.playSoundEffect('handleDestroyingPlayerBlockCollision');
    }
  }

  public handleTopPlayerPipeCollision() {
    if (this.player.actionState.constructor.name !== 'WarpingActionState') {
      this.player.location.subtract({
        x: 0,
        y: this.collison.intersection.height,
      });

      if (this.player.actionState.constructor.name === 'FallingActionState') {
        this.player.land();
        this.player.cutYVelocity();

        // StatManager.instance(resetConsecutivePoints()
      }
    }
  }

  public handleBottomPlayerPipeCollision() {
    if (this.player.actionState.constructor.name !== 'WarpingActionState') {
      if (this.player.actionState.constructor.name === 'JumpingActionState') {
        this.player.location.add({
          x: 0,
          y: this.collison.intersection.height,
        });
        this.player.applyImpulse(
          physics.blockBumpForce.subtract({ x: 0, y: this.player.velocity.y })
        );
        this.block.bump();

        // SoundManager.instance.playSoundEffect('handleTopPlayerPipeCollision');
      }
    }
  }

  public handleLeftPlayerPipeCollision() {
    if (this.player.actionState.constructor.name !== 'WarpingActionState') {
      this.player.location.add({
        x: this.collison.intersection.width,
        y: 0,
      });

      if (this.player.velocity.x < 0) {
        this.player.cutXVelocity();
      }
    }
  }

  public handleRightPlayerPipeCollision() {
    if (this.player.actionState.constructor.name !== 'WarpingActionState') {
      this.player.location.subtract({
        x: this.collison.intersection.width,
        y: 0,
      });

      if (this.player.velocity.x > 0) {
        this.player.cutXVelocity();
      }
    }
  }
}
