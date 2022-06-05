import { IBlock } from '../types';
import { BlockState } from './BlockState';
import { BumpedBlockState } from './BumpedBlockState';
import { UsedBlockState } from './UsedBlockState';

export class BumpableBlockState extends BlockState {
  // private readonly itemContainer: IItemContainer;

  constructor(block: IBlock) {
    super(block);

    // this.itemContainer = block;
  }

  public override bump(): void {
    console.log('item created');
    this.block.blockState = new BumpedBlockState(
      this.block /* UsedBlockState */
    );
  }
}
