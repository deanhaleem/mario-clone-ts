import { CollectionBlock } from './CollectionBlock';

export class FloorBlock extends CollectionBlock {
  protected override spriteName = 'FloorBlock';

  public constructor(location: Phaser.Math.Vector2) {
    super(location, new Phaser.Math.Vector2(0, 0));

    super.setSprite(this.spriteName);
  }
}
