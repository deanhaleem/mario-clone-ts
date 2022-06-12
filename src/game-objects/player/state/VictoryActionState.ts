import { IPlayer } from '../types';
import { ActionState } from './ActionState';
import { JumpingActionState } from './JumpingActionState';

export class VictoryActionState extends ActionState {
  public override spriteName = 'Victory';

  constructor(player: IPlayer) {
    super(player);

    this.player.cutXVelocity();
    this.player.cutYVelocity();
  }

  public override jump(): void {
    this.player.cutYVelocity();
    this.player.actionState = new JumpingActionState(this.player);
  }
}
