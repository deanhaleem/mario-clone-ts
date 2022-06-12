import { timers } from '../../../utils/constants/Timers';
import { IPlayer } from '../types';
import { StandingActionState } from './StandingActionState';
import { TransformingActionStae } from './TransformingActionState';

export class DowngradingActionState extends TransformingActionStae {
  public override spriteName = 'Downgrading';

  constructor(player: IPlayer) {
    super(player, timers.playerDowngradeTimer);
  }

  protected override setStateAfterTransformation(): void {
    this.player.actionState = new StandingActionState(this.player);

    super.setStateAfterTransformation();

    // Game1.instance.player = new BlinkingMario(this.player);
    this.player.decorate();
  }
}
