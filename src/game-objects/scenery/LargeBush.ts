import { Scenery } from './Scenery';

export class LargeBush extends Scenery {
  protected override spriteName = 'LargeBush';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
