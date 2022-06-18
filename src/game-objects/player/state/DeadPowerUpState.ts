import { IPlayer } from '../types';
import { PowerUpState } from './PowerUpState';

export class DeadPowerUpState extends PowerUpState {
  public override spriteName = 'Dead';

  constructor(player: IPlayer) {
    super(player);
  }

  public override turnDead(): void {}
}
