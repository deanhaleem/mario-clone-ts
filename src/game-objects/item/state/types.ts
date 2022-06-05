import { IUpdatable } from '../../../types';

export interface IItemState extends IUpdatable {
  land(): void;
}
