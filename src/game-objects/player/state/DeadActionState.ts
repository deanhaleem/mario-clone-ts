import { physics } from '../../../utils/constants/Physics';
import { IPlayer } from '../types';
import { ActionState } from './ActionState';

export class DeadActionState extends ActionState {
  public override spriteName = 'Dead';

  constructor(player: IPlayer) {
    super(player);

    this.player.cutXVelocity();
    this.player.cutYVelocity();
    this.player.applyImpulse(physics.deadPlayerImpulse);
    this.player.applyForce(physics.deadPlayerGravitationalForce);

    // StatManager.instance.gainOrLoseLife(false);
    // SoundManager.instance.playSoundEffect('DeadActionState');
    // Game1.instance.die();
    // Game1.instance.unregisterGameObject(this.player);
  }
}
