import { Directions } from '../../../physics/types';
import { physics } from '../../../utils/constants/Physics';
import { IPlayer } from '../types';
import { ActionState } from './ActionState';
import { CrouchingActionState } from './CrouchingActionState';
import { FallingActionState } from './FallingActionState';
import { JumpingActionState } from './JumpingActionState';
import { RunningActionState } from './RunningActionState';
import { SlidingActionState } from './SlidingActionState';
import { StandingActionState } from './StandingActionState';

export class WalkingActionState extends ActionState {
  public override spriteName = 'Walking';

  constructor(player: IPlayer) {
    super(player);

    this.player.cutYVelocity();
    this.player.applyForce(
      physics.playerHorizontalAcceleration.multiply(
        new Phaser.Math.Vector2(this.player.direction)
      )
    );
    this.player.setMaxVelocity(physics.maxPlayerVelocity);
  }

  public override jump() {
    this.player.actionState = new JumpingActionState(this.player);
  }

  public override walkLeft(): void {
    if (this.player.direction === Directions.Right) {
      this.player.actionState = new SlidingActionState(this.player);
    }
  }

  public override walkRight(): void {
    if (this.player.direction === Directions.Left) {
      this.player.actionState = new SlidingActionState(this.player);
    }
  }

  public override crouch() {
    this.player.actionState = new CrouchingActionState(this.player);
  }

  public override fall(): void {
    this.player.actionState = new FallingActionState(this.player);
  }

  public override run(): void {
    this.player.actionState = new RunningActionState(this.player);
  }

  public override stopMovingLeft(): void {
    if (this.player.direction === Directions.Left) {
      this.player.actionState = new SlidingActionState(this.player);
    }
  }

  public override stopMovingRight(): void {
    if (this.player.direction === Directions.Right) {
      this.player.actionState = new SlidingActionState(this.player);
    }
  }
}
