import { timers } from '../../../utils/constants/Timers';
import { IPlayer } from '../types';
import { StandingActionState } from './StandingActionState';
import { TransformingActionStae } from './TransformingActionState';

export class UpgradingActionState extends TransformingActionStae {
  public override spriteName = 'Upgrading';

  constructor(player: IPlayer) {
    super(player, timers.playerUpgradeTimer);
  }

  protected override setStateAfterTransformation(): void {
    this.player.actionState = new StandingActionState(this.player);

    super.setStateAfterTransformation();
  }
}
