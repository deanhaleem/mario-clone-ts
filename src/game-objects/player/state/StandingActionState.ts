import { IPlayer } from '../types';
import { ActionState } from './ActionState';
import { CrouchingActionState } from './CrouchingActionState';
import { JumpingActionState } from './JumpingActionState';
import { WalkingActionState } from './WalkingActionState';

export class StandingActionState extends ActionState {
  public override spriteName = 'Standing';

  constructor(player: IPlayer) {
    super(player);
  }

  public override jump() {
    this.player.actionState = new JumpingActionState(this.player);
  }

  public override walkLeft() {
    this.player.actionState = new WalkingActionState(this.player);
  }

  public override walkRight() {
    this.player.actionState = new WalkingActionState(this.player);
  }

  public override crouch(): void {
    this.player.actionState = new CrouchingActionState(this.player);
  }
}
