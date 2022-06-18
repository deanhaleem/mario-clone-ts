import { Constructor } from '../../types';
import { IItem } from '../item/types';
import { Block } from './Block';
import { BumpableBlockState } from './state/BumpableBlockState';
import { IItemContainer } from './types';

export abstract class ItemContainingBlock
  extends Block
  implements IItemContainer
{
  public itemType: Constructor<IItem>;

  protected constructor(
    location: Phaser.Math.Vector2,
    itemType: Constructor<IItem>
  ) {
    super(location);

    this.itemType = itemType;
    this.blockState = new BumpableBlockState(this);
  }
}
