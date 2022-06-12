import { IPlayer } from '../types';
import { ActionState } from './ActionState';

export abstract class TransformingActionStae extends ActionState {
  constructor(player: IPlayer, time: number) {
    super(player);

    this.player.cutXVelocity();
    this.player.cutYVelocity();

    // TimedActionManager.instance.registerTimedAction(null, setStateAfterTransformation, time);
    // Game1.instance.transition();
    // Game1.instance.unregisterGameObject(this.player);

    // SoundManager.instance.playSoundEffect('transform');
  }

  public override update(time: number, delta: number): void {
    this.player.cutXVelocity();
    this.player.cutYVelocity();

    super.update(time, delta);
  }

  protected setStateAfterTransformation(): void {
    // Game1.instance.registerGameObject(this.player);
    // Game1.instance.transition();
  }
}
