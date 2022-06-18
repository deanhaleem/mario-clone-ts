import { CollectionBlock } from './CollectionBlock';

export class BrickCollectionBlock extends CollectionBlock {
  constructor(location: Phaser.Math.Vector2, size: Phaser.Math.Vector2) {
    super(location, size);

    super.setSprite(this.spriteName);
  }

  protected override get spriteName() {
    return 'BrickBlock';
  }
}
