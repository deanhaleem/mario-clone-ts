import { Constructor } from '../../types';
import { IItem } from '../item/types';
import { BlockFactory } from './BlockFactory';
import { ItemContainingBlock } from './ItemContainingBlock';

export class HiddenBlock extends ItemContainingBlock {
  public constructor(
    location: Phaser.Math.Vector2,
    itemType: Constructor<IItem>
  ) {
    super(location, itemType);

    super.setSprite(this.spriteName);
  }

  public override bump(): void {
    BlockFactory.instance.createBlock('HiddenBlock', this.location);
    // Game1.instance.disposeOfObject(this);

    super.bump();
  }

  protected override get spriteName() {
    return 'HiddenBlock';
  }
}
