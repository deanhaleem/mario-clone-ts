import { IBlock } from '../../game-objects/block/types';
import { IItem } from '../../game-objects/item/types';
import { ICollision } from '../types';

export class ItemBlockCollisionHandler {
  private readonly item: IItem;
  private readonly block: IBlock;
  private readonly collison: ICollision;

  constructor(item: IItem, block: IBlock, collision: ICollision) {
    this.item = item;
    this.block = block;
    this.collison = collision;
  }

  public handleTopItemBlockCollision() {
    this.item.location.subtract({
      x: 0,
      y: this.collison.intersection.height,
    });
    this.item.land();
  }

  public handleBottomItemBlockCollision() {
    this.item.location.add({
      x: 0,
      y: this.collison.intersection.height,
    });
  }

  public handleLeftItemBlockCollision() {
    this.item.location.add({
      x: this.collison.intersection.width,
      y: 0,
    });
    this.item.changeDirection();
  }

  public handleRightItemBlockCollision() {
    this.item.location.subtract({
      x: this.collison.intersection.width,
      y: 0,
    });
    this.item.changeDirection();
  }
}
