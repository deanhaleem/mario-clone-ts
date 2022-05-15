import { IPlayer } from '../types';
import { PowerUpState } from './PowerUpState';

export class BigPowerUpState extends PowerUpState {
  public override spriteName = 'Big';

  constructor(player: IPlayer) {
    super(player);
  }
}
