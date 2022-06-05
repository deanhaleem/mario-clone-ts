import { Block } from './Block';
import { BumpableBlockState } from './state/BumpableBlockState';
import { IItemContainer } from './types';

export abstract class ItemContainingBlock
  extends Block
  implements IItemContainer
{
  // public itemType: ConstructorFunction

  protected constructor(
    location: Phaser.Math.Vector2 /* itemType: ConstructorFunction */
  ) {
    super(location);

    //this.itemType = itemType;
    this.blockState = new BumpableBlockState(this);
  }
}
