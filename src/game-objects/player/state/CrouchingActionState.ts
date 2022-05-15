import { IPlayer } from '../types';
import { ActionState } from './ActionState';
import { StandingActionState } from './StandingActionState';

export class CrouchingActionState extends ActionState {
  public override spriteName = 'Crouching';

  constructor(player: IPlayer) {
    super(player);
  }

  public override stopJumping(): void {
    this.player.actionState = new StandingActionState(this.player);
  }
}
