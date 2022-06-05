import { CollectionBlock } from './CollectionBlock';

export class BrickCollectionBlock extends CollectionBlock {
  protected override spriteName = 'BrickBlock';

  constructor(location: Phaser.Math.Vector2, size: Phaser.Math.Vector2) {
    super(location, size);
  }
}
