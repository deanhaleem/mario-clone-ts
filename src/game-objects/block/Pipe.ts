import { NonBumpableBlock } from './NonBumpableBlock';
import { IPipe } from './types';

export abstract class Pipe extends NonBumpableBlock implements IPipe {
  public warpLocation: Phaser.Math.Vector2;

  //   public warpHitbox = new Phaser.Geom.Rectangle(
  //     this.hitbox.x + this.hitbox.width / 2 - Offsets.warpWidth,
  //     this.hitbox.y,
  //     Offsets.warpHitboxWidth,
  //     this.hitbox.height
  //   );

  protected constructor(
    location: Phaser.Math.Vector2
    // warpLocation: Phaser.Math.Vector2
  ) {
    super(location);

    // this.warpLocation = warpLocation;
  }
}
