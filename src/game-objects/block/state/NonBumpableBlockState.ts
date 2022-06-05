import { IBlock } from '../types';
import { BlockState } from './BlockState';

export class NonBumpableBlockState extends BlockState {
  constructor(block: IBlock) {
    super(block);
  }
}
