import { physics } from '../../../utils/constants/physics';
import { IPlayer } from '../types';
import { ActionState } from './ActionState';

export abstract class AerialActionState extends ActionState {
  protected constructor(player: IPlayer) {
    super(player);
  }

  public override walkRight(): void {
    this.player.applyForce(
      this.player.velocity.x > 0
        ? new Phaser.Math.Vector2(
            physics.horizontalPlayerAerialForce.x,
            this.player.acceleration.y
          )
        : new Phaser.Math.Vector2(
            physics.horizontalPlayerAerialForce.y,
            this.player.acceleration.y
          )
    );
  }

  public override walkLeft(): void {
    this.player.applyForce(
      this.player.velocity.x > 0
        ? new Phaser.Math.Vector2(
            -physics.horizontalPlayerAerialForce.x,
            this.player.acceleration.y
          )
        : new Phaser.Math.Vector2(
            -physics.horizontalPlayerAerialForce.y,
            this.player.acceleration.y
          )
    );
  }

  public override stopMovingRight(): void {
    this.player.applyForce(
      new Phaser.Math.Vector2(0, this.player.acceleration.y)
    );
  }

  public override stopMovingLeft(): void {
    this.player.applyForce(
      new Phaser.Math.Vector2(0, this.player.acceleration.y)
    );
  }
}
