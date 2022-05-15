import { Scenery } from './Scenery';

export class SmallCastle extends Scenery {
  protected override spriteName = 'SmallCastle';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
