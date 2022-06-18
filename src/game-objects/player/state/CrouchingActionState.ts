import { IPlayer } from '../types';
import { ActionState } from './ActionState';
import { FallingActionState } from './FallingActionState';
import { StandingActionState } from './StandingActionState';

export class CrouchingActionState extends ActionState {
  public override spriteName = 'Crouching';

  constructor(player: IPlayer) {
    super(player);

    this.player.cutXVelocity();
    this.player.cutYVelocity();
  }

  public override stopCrouching(): void {
    this.player.actionState = new StandingActionState(this.player);
  }

  public override fall(): void {
    this.player.actionState = new FallingActionState(this.player);
  }
}
