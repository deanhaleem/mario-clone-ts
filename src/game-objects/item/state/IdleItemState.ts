import { IItem } from '../types';
import { ItemState } from './ItemState';

export class IdleItemState extends ItemState {
  constructor(item: IItem) {
    super(item);

    this.item.cutYVelocity();
  }
}
