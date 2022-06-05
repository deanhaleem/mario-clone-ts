import { IUpdatable } from '../../../types';

export interface IBlockState extends IUpdatable {
  bump(): void;
  destroy(): void;
}
