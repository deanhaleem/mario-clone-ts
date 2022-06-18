import { IPlayer } from '../types';
import { FirePowerUpState } from './FirePowerUpState';
import { PowerUpState } from './PowerUpState';

export class BigPowerUpState extends PowerUpState {
  public override spriteName = 'Big';

  constructor(player: IPlayer) {
    super(player);
  }

  public override upgrade(): void {
    this.player.powerUpState = new FirePowerUpState(this.player);

    super.upgrade();
  }
}
