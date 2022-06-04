import { IPlayer } from '../types';
import { IPowerUpState } from './types';

export abstract class PowerUpState implements IPowerUpState {
  protected player: IPlayer;

  public abstract spriteName: string;

  protected constructor(player: IPlayer) {
    this.player = player;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(time: number, delta: number): void {}
}
