import { IPlayer } from '../types';
import { IActionState } from './types';

export abstract class ActionState implements IActionState {
  protected player: IPlayer;

  public abstract spriteName: string;

  protected constructor(player: IPlayer) {
    this.player = player;
  }

  public update(time: number, delta: number): void {}
  stand(): void {}
  jump(): void {}
  walkRight(): void {}
  walkLeft(): void {}
  crouch(): void {}
  stopJumping(): void {}
  stopMovingRight(): void {}
  stopMovingLeft(): void {}
  stopCrouching(): void {}
}
