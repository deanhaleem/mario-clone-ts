import { Scenery } from './Scenery';

export class MediumCloud extends Scenery {
  protected override spriteName = 'MediumCloud';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
