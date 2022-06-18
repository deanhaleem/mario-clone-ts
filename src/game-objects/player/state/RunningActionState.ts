import { Directions } from '../../../physics/types';
import { physics } from '../../../utils/constants/Physics';
import { IPlayer } from '../types';
import { ActionState } from './ActionState';
import { CrouchingActionState } from './CrouchingActionState';
import { FallingActionState } from './FallingActionState';
import { JumpingActionState } from './JumpingActionState';
import { SlidingActionState } from './SlidingActionState';
import { WalkingActionState } from './WalkingActionState';

export class RunningActionState extends ActionState {
  public override spriteName = 'Running';

  constructor(player: IPlayer) {
    super(player);

    this.player.applyForce(
      physics.playerHorizontalAcceleration.multiply(
        new Phaser.Math.Vector2(this.player.direction)
      )
    );
    this.player.setMaxVelocity(physics.playerMaxRunningVelocity);
  }

  public override jump(): void {
    this.player.actionState = new JumpingActionState(this.player);
  }

  public override walkRight(): void {
    if (this.player.direction === Directions.Left) {
      this.player.actionState = new SlidingActionState(this.player);
    }
  }

  public override walkLeft(): void {
    if (this.player.direction === Directions.Right) {
      this.player.actionState = new SlidingActionState(this.player);
    }
  }

  public override crouch(): void {
    this.player.actionState = new CrouchingActionState(this.player);
  }

  public override fall(): void {
    this.player.actionState = new FallingActionState(this.player);
  }

  public override stopMovingRight(): void {
    if (this.player.direction === Directions.Right) {
      this.player.actionState = new SlidingActionState(this.player);
    }
  }

  public override stopMovingLeft(): void {
    if (this.player.direction === Directions.Left) {
      this.player.actionState = new SlidingActionState(this.player);
    }
  }

  public override stopRunning(): void {
    this.player.actionState = new WalkingActionState(this.player);
  }
}
