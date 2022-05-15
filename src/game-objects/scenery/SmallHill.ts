import { Scenery } from './Scenery';

export class SmallHill extends Scenery {
  protected override spriteName = 'SmallHill';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
