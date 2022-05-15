import { IPlayer } from '../types';
import { ActionState } from './ActionState';
import { StandingActionState } from './StandingActionState';

export class JumpingActionState extends ActionState {
  public override spriteName = 'Jumping';

  constructor(player: IPlayer) {
    super(player);
  }

  public override stopJumping(): void {
    this.player.actionState = new StandingActionState(this.player);
  }
}
