import { CollectionBlock } from './CollectionBlock';

export class FloorBlock extends CollectionBlock {
  public constructor(location: Phaser.Math.Vector2, size: Phaser.Math.Vector2) {
    super(location, size);

    super.setSprite(this.spriteName);
  }

  protected override get spriteName() {
    return 'FloorBlock';
  }
}
