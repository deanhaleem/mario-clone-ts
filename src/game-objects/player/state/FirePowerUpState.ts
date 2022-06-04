import { IPlayer } from '../types';
import { PowerUpState } from './PowerUpState';

export class FirePowerUpState extends PowerUpState {
  public override spriteName = 'Fire';

  constructor(player: IPlayer) {
    super(player);
  }
}
