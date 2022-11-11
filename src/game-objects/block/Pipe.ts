import { offsets } from '../../utils/constants/offsets';
import { NonBumpableBlock } from './NonBumpableBlock';
import { IPipe } from './types';

export abstract class Pipe extends NonBumpableBlock implements IPipe {
  public warpLocation: Phaser.Math.Vector2;

  protected constructor(
    location: Phaser.Math.Vector2,
    warpLocation: Phaser.Math.Vector2
  ) {
    super(location);

    this.warpLocation = warpLocation;
  }

  public get warpHitbox() {
    return new Phaser.Geom.Rectangle(
      this.hitbox.x + this.hitbox.width / 2 - offsets.warpWidth,
      this.hitbox.y,
      offsets.warpHitboxWidth,
      this.hitbox.height
    );
  }
}
