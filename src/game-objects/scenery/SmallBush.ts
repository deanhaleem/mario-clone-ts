import { Scenery } from './Scenery';

export class SmallBush extends Scenery {
  protected override spriteName = 'SmallBush';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
