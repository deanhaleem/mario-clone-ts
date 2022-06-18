import { Constructor } from '../../types';
import { IItem } from '../item/types';
import { ItemContainingBlock } from './ItemContainingBlock';

export class ItemBrickBlock extends ItemContainingBlock {
  constructor(location: Phaser.Math.Vector2, itemType: Constructor<IItem>) {
    super(location, itemType);

    super.setSprite(this.spriteName);
  }

  protected override get spriteName() {
    return 'BrickBlock';
  }
}
