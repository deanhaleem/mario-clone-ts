import { Directions } from '../../../physics/types';
import { physics } from '../../../utils/constants/Physics';
import { IPlayer } from '../types';
import { ActionState } from './ActionState';
import { StandingActionState } from './StandingActionState';
import { WalkingActionState } from './WalkingActionState';

export class FallingActionState extends ActionState {
  public override spriteName = 'Jumping';

  constructor(player: IPlayer) {
    super(player);

    this.player.applyForce(
      new Phaser.Math.Vector2(
        physics.playerFallingGravitationalForce.x + this.player.acceleration.x,
        physics.playerFallingGravitationalForce.y
      )
    );

    console.log('falling', Date.now().toLocaleString('en-US'));
  }

  public override land(): void {
    console.log('land', Date.now().toLocaleString('en-US'));
    if (Math.abs(this.player.velocity.x) <= Number.EPSILON * 2) {
      this.player.actionState = new StandingActionState(this.player);
    } else {
      this.player.direction =
        this.player.velocity.x > 0 ? Directions.Right : Directions.Left;
      this.player.actionState = new WalkingActionState(this.player);
    }
  }
}
