import { Directions } from '../../../physics/types';
import { IPlayer } from '../types';
import { ActionState } from './ActionState';
import { CrouchingActionState } from './CrouchingActionState';
import { FallingActionState } from './FallingActionState';
import { JumpingActionState } from './JumpingActionState';
import { WalkingActionState } from './WalkingActionState';

export class StandingActionState extends ActionState {
  public override spriteName = 'Standing';

  constructor(player: IPlayer) {
    super(player);

    this.player.cutXVelocity();
    this.player.cutYVelocity();
  }

  public override jump() {
    this.player.actionState = new JumpingActionState(this.player);
  }

  public override walkLeft() {
    if (this.player.direction === Directions.Left) {
      this.player.actionState = new WalkingActionState(this.player);
    } else {
      this.player.direction = Directions.Left;
    }
  }

  public override walkRight() {
    if (this.player.direction === Directions.Right) {
      this.player.actionState = new WalkingActionState(this.player);
    } else {
      this.player.direction = Directions.Right;
    }
  }

  public override crouch(): void {
    this.player.actionState = new CrouchingActionState(this.player);
  }

  public override fall(): void {
    this.player.actionState = new FallingActionState(this.player);
  }
}
