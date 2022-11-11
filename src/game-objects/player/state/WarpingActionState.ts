import { offsets } from '../../../utils/constants/offsets';
import { physics } from '../../../utils/constants/physics';
import { IPlayer } from '../types';
import { ActionState } from './ActionState';
import { StandingActionState } from './StandingActionState';

export class WarpingActionState extends ActionState {
  private readonly warpLocation: Phaser.Math.Vector2;
  private readonly warpVelocity: Phaser.Math.Vector2;
  private readonly warpTime: number;
  private warpTimer: number;

  public override spriteName = 'Warping';

  constructor(
    player: IPlayer,
    location: Phaser.Math.Vector2,
    velocity: Phaser.Math.Vector2
  ) {
    super(player);

    this.warpLocation = location;
    this.warpVelocity = velocity;
    this.warpTime = offsets.tile;
    this.warpTimer = 0;

    this.player.cutXVelocity();
    this.player.cutYVelocity();

    // Game1.instance.warp();
    // Game1.instance.unregisterGameObject(this.player);
  }

  public override update(time: number, delta: number): void {
    this.setWarpTimer(physics.warpSpeed);

    this.player.location.add(this.warpVelocity);

    super.update(time, delta);
  }

  private setWarpTimer(speed: number): void {
    this.warpTimer += speed;
    if (this.warpTimer >= this.warpTime) {
      this.player.actionState = new StandingActionState(this.player);
      // Game1.instance.registerGameObject(this.player);
      if (!this.warpLocation.equals(new Phaser.Math.Vector2())) {
        new Phaser.Math.Vector2(
          this.warpLocation.x,
          this.warpLocation.y + offsets.tile
        );
      } else {
        // Game1.instance.warp();
      }
    }
  }

  public override warp(
    location: Phaser.Math.Vector2,
    velocity: Phaser.Math.Vector2
  ): void {}
}
