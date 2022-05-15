import { Scenery } from './Scenery';

export class LargeHill extends Scenery {
  protected override spriteName = 'LargeHill';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
