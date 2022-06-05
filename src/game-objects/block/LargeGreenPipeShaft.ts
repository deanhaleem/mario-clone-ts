import { CollectionBlock } from './CollectionBlock';

export class LargeGreenPipeShaft extends CollectionBlock {
  protected override spriteName = 'LargeGreenPipeShaft';

  public constructor(location: Phaser.Math.Vector2) {
    super(location, new Phaser.Math.Vector2(0, 0));
    super.setSprite(this.spriteName);
  }
}
