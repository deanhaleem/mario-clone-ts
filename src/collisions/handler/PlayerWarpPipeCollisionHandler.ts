import { IPipe } from '../../game-objects/block/types';
import { BlinkingMario } from '../../game-objects/player/BlinkingMario';
import { IPlayer } from '../../game-objects/player/types';
import { Directions } from '../../physics/types';
import { physics } from '../../utils/constants/Physics';

export class PlayerWarpPipeCollisionHandler {
  private readonly player: IPlayer;
  private readonly pipe: IPipe;

  constructor(player: IPlayer, pipe: IPipe) {
    this.player = player;
    this.pipe = pipe;
  }

  public handleTopPlayerWarpPipeCollision() {
    if (this.player.canWarp) {
      if (this.player.constructor.name === 'BlinkingMario') {
        (this.player as BlinkingMario).removeDecorator();
      }
      this.player.warp(this.pipe.warpLocation, physics.verticalWarpVelocity);
    }
  }

  public handleBottomPlayerWarpPipeCollision() {
    this.player.warp(
      Phaser.Math.Vector2.ZERO,
      physics.verticalWarpVelocity.negate()
    );
  }

  public handleRightPlayerWarpPipeCollision() {
    if (
      this.player.direction === Directions.Right &&
      (this.player.actionState.constructor.name === 'RunningActionState' ||
        this.player.actionState.constructor.name === 'WalkingActionState')
    ) {
      if (this.player.constructor.name === 'BlinkingMario') {
        (this.player as BlinkingMario).removeDecorator();
      }
      this.player.warp(this.pipe.warpLocation, physics.horizontalWarpVelocity);
    }
  }
}
