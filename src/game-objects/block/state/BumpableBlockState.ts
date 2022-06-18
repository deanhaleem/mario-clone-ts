import { ItemFactory } from '../../item/ItemFactory';
import { IItemContainer } from '../types';
import { BlockState } from './BlockState';
import { BumpedBlockState } from './BumpedBlockState';
import { UsedBlockState } from './UsedBlockState';

export class BumpableBlockState extends BlockState {
  private readonly itemContainer: IItemContainer;

  constructor(block: IItemContainer) {
    super(block);

    this.itemContainer = block;
  }

  public override bump(): void {
    ItemFactory.instance.createItem(
      typeof this.itemContainer.itemType,
      this.block.location
    );
    this.block.blockState = new BumpedBlockState(this.block, UsedBlockState);
  }
}
