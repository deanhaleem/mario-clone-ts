import { IItem } from '../types';
import { IItemState } from './types';

export abstract class ItemState implements IItemState {
  protected item: IItem;

  protected constructor(item: IItem) {
    this.item = item;
  }

  public update(time: number, delta: number): void {}
  public land(): void {}
}
