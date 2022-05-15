import { Scenery } from './Scenery';

export class MediumBush extends Scenery {
  protected override spriteName = 'MediumBush';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
