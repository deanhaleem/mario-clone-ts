import { IBlock } from '../types';
import { BlockState } from './BlockState';
import { BumpedBlockState } from './BumpedBlockState';
import { DestroyedBlockState } from './DestroyedBlockState';

export class DestroyableBlockState extends BlockState {
  constructor(block: IBlock) {
    super(block);
  }

  public override bump(): void {
    this.block.blockState = new BumpedBlockState(
      this.block,
      DestroyableBlockState
    );
  }

  public override destroy(): void {
    this.block.blockState = new DestroyedBlockState(this.block);
  }
}
