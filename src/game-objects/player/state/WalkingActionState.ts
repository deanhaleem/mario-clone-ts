import { IPlayer } from '../types';
import { ActionState } from './ActionState';
import { CrouchingActionState } from './CrouchingActionState';
import { JumpingActionState } from './JumpingActionState';
import { StandingActionState } from './StandingActionState';

export class WalkingActionState extends ActionState {
  public override spriteName = 'Walking';

  constructor(player: IPlayer) {
    super(player);
  }

  public override jump() {
    this.player.actionState = new JumpingActionState(this.player);
  }

  public override crouch() {
    this.player.actionState = new CrouchingActionState(this.player);
  }

  public override stopMovingLeft(): void {
    this.player.actionState = new StandingActionState(this.player);
  }
}
