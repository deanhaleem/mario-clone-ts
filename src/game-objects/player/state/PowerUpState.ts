import { IPlayer } from '../types';
import { IPowerUpState } from './types';

export abstract class PowerUpState implements IPowerUpState {
  protected player: IPlayer;

  public abstract spriteName: string;

  protected constructor(player: IPlayer) {
    this.player = player;
  }

  update(time: number, delta: number): void {}
}
