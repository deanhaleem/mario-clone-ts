import { IPlayer } from '../types';
import { BigPowerUpState } from './BigPowerUpState';
import { DeadActionState } from './DeadActionState';
import { DeadPowerUpState } from './DeadPowerUpState';
import { PowerUpState } from './PowerUpState';

export class SmallPowerUpState extends PowerUpState {
  public override spriteName = 'Small';

  constructor(player: IPlayer) {
    super(player);
  }

  public override takeDamage(): void {
    this.player.powerUpState = new DeadPowerUpState(this.player);
    this.player.actionState = new DeadActionState(this.player);
  }

  public override upgrade(): void {
    this.player.powerUpState = new BigPowerUpState(this.player);

    super.upgrade();
  }
}
