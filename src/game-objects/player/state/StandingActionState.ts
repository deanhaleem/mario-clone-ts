import { IPlayer } from '../types';
import { ActionState } from './ActionState';

export class StandingActionState extends ActionState {
  public override spriteName = 'Standing';

  constructor(player: IPlayer) {
    super(player);
  }
}
