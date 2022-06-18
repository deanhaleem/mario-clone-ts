import { physics } from '../../../utils/constants/Physics';
import { IPlayer } from '../types';
import { AerialActionState } from './AerialActionState';
import { FallingActionState } from './FallingActionState';

export class JumpingActionState extends AerialActionState {
  public override spriteName = 'Jumping';

  constructor(player: IPlayer) {
    super(player);

    this.player.applyForce(
      physics.playerJumpingGravitationalForce.add(
        new Phaser.Math.Vector2(this.player.acceleration.x, 0)
      )
    );

    if (this.player.velocity.y <= 0) {
      this.player.applyImpulse(
        physics.playerJumpImpulse.subtract(
          new Phaser.Math.Vector2(0, this.player.velocity.y)
        )
      );
    }

    // SoundManager.instance.playSoundEffect(`${this.player.powerUpState.spriteName}${this.spriteName}`);
  }

  public override update(time: number, delta: number): void {
    if (this.player.velocity.y >= 0) {
      this.player.actionState = new FallingActionState(this.player);
    }

    super.update(time, delta);
  }

  public override stopJumping(): void {
    if (this.player.velocity.y < -physics.stopJumpingThreshold) {
      this.player.applyImpulse(
        new Phaser.Math.Vector2(
          0,
          -this.player.velocity.y - physics.stopJumpingThreshold
        )
      );
    }
  }
}
