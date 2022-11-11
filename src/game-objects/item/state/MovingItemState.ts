import { physics } from '../../../utils/constants/physics';
import { IItem } from '../types';
import { ItemState } from './ItemState';

export class MovingItemState extends ItemState {
  constructor(item: IItem) {
    super(item);

    this.item.cutYVelocity();
    this.item.applyImpulse(physics.movingItemImpulse);
  }
}
