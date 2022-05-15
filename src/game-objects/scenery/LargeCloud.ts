import { Scenery } from './Scenery';

export class LargeCloud extends Scenery {
  protected override spriteName = 'LargeCloud';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
