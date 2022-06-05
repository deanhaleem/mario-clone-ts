import { IBlock } from '../types';
import { IBlockState } from './types';

export abstract class BlockState implements IBlockState {
  protected block: IBlock;

  protected constructor(block: IBlock) {
    this.block = block;
  }

  update(time: number, delta: number): void {}
  bump(): void {}
  destroy(): void {}
}
