import { physics } from '../../../utils/constants/Physics';
import { IPlayer } from '../types';
import { AerialActionState } from './AerialActionState';
import { FallingActionState } from './FallingActionState';

export class JumpingActionState extends AerialActionState {
  public override spriteName = 'Jumping';

  constructor(player: IPlayer) {
    super(player);

    this.player.applyForce(
      new Phaser.Math.Vector2(
        physics.playerJumpingGravitationalForce.x + this.player.acceleration.x,
        physics.playerJumpingGravitationalForce.y
      )
    );

    console.log('jumping', Date.now().toLocaleString('en-US'));
    console.log(this.player.velocity);
    if (this.player.velocity.y <= 0) {
      this.player.applyImpulse(
        new Phaser.Math.Vector2(
          physics.playerJumpImpulse.x,
          physics.playerJumpImpulse.y - this.player.velocity.y
        )
      );
    }

    // SoundManager.instance.playSoundEffect(`${this.player.powerUpState.spriteName}${this.spriteName}`);
  }

  public override update(time: number, delta: number): void {
    if (this.player.velocity.y >= 0) {
      console.log('MADE IT INTO HERE');
      this.player.actionState = new FallingActionState(this.player);
    }

    super.update(time, delta);
  }

  public override stopJumping(): void {
    console.log('EXECUTE STOP JUMPING');
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
