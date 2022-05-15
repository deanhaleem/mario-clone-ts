import { Scenery } from './Scenery';

export class SmallCloud extends Scenery {
  protected override spriteName = 'SmallCloud';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
