import { CollectionBlock } from './CollectionBlock';

export class StairBlock extends CollectionBlock {
  protected override spriteName = 'StairBlock';

  public constructor(location: Phaser.Math.Vector2) {
    super(location, new Phaser.Math.Vector2(0, 0));

    super.setSprite(this.spriteName);
  }
}
