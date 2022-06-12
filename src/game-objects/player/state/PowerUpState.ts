import { IPlayer } from '../types';
import { SmallPowerUpState } from './SmallPowerUpState';
import { IPowerUpState } from './types';

export abstract class PowerUpState implements IPowerUpState {
  protected player: IPlayer;

  public abstract spriteName: string;

  protected constructor(player: IPlayer) {
    this.player = player;
  }

  public upgrade(): void {
    this.player.actionState.upgrade();
  }

  public decorate(): void {
    // this.player = Game1.instance.player;
  }

  public turnDead(): void {
    // if (Game1.instance.gameState !== typeof VictoryGameState) {
    //   this.player.powerUpState = new DeadPowerUpState(this.player);
    //   this.player.actionState = new DeadActionState(this.player);
    // }
  }

  public takeDamage(): void {
    this.player.powerUpState = new SmallPowerUpState(this.player);
    this.player.actionState.downgrade();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(time: number, delta: number): void {}
  public attack(): void {}
}
