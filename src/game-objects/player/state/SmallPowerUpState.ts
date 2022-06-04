import { IPlayer } from '../types';
import { PowerUpState } from './PowerUpState';

export class SmallPowerUpState extends PowerUpState {
  public override spriteName = 'Small';

  constructor(player: IPlayer) {
    super(player);
  }
}
