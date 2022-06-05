import { IBlock } from '../types';
import { BlockState } from './BlockState';

export class UsedBlockState extends BlockState {
  constructor(block: IBlock) {
    super(block);

    this.block.setSprite('UsedBlock');
  }
}
