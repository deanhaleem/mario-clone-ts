import { ItemContainingBlock } from './ItemContainingBlock';

export class ItemBrickBlock extends ItemContainingBlock {
  protected override spriteName = 'BrickBlock';

  constructor(
    location: Phaser.Math.Vector2 /* itemType: ConstructorFunction */
  ) {
    super(location);
    super.setSprite(this.spriteName);
  }
}
