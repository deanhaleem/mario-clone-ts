import { Directions } from '../../../physics/types';
import { physics } from '../../../utils/constants/Physics';
import { IPlayer } from '../types';
import { ActionState } from './ActionState';
import { StandingActionState } from './StandingActionState';
import { WalkingActionState } from './WalkingActionState';

export class FallingActionState extends ActionState {
  public override spriteName = 'Falling';

  constructor(player: IPlayer) {
    super(player);

    this.player.applyForce(
      physics.playerFallingGravitationalForce.add(
        new Phaser.Math.Vector2(this.player.acceleration.x, 0)
      )
    );
  }

  public override land(): void {
    if (Math.abs(this.player.velocity.x) <= Number.EPSILON * 2) {
      this.player.actionState = new StandingActionState(this.player);
    } else {
      this.player.direction =
        this.player.velocity.x > 0 ? Directions.Right : Directions.Left;
      this.player.actionState = new WalkingActionState(this.player);
    }
  }
}
