import { Directions } from '../../../physics/types';
import { physics } from '../../../utils/constants/Physics';
import { IPlayer } from '../types';
import { ActionState } from './ActionState';
import { FallingActionState } from './FallingActionState';
import { JumpingActionState } from './JumpingActionState';
import { StandingActionState } from './StandingActionState';

export class SlidingActionState extends ActionState {
  public override spriteName = 'Sliding';

  constructor(player: IPlayer) {
    super(player);

    this.player.direction =
      this.player.direction === Directions.Left
        ? Directions.Right
        : Directions.Left;
    this.player.applyForce(
      physics.playerSlidingAcceleration.multiply(
        new Phaser.Math.Vector2(this.player.direction)
      )
    );
  }

  public override update(time: number, delta: number): void {
    if (Math.abs(this.player.velocity.x) <= 0.1) {
      this.player.direction =
        this.player.direction === Directions.Left
          ? Directions.Right
          : Directions.Left;
      this.player.actionState = new StandingActionState(this.player);
    }

    super.update(time, delta);
  }

  public override jump(): void {
    this.player.actionState = new JumpingActionState(this.player);
  }

  public override fall(): void {
    this.player.actionState = new FallingActionState(this.player);
  }
}
