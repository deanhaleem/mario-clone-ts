import { IBlock } from '../../../game-objects/block/types';
import { IItem } from '../../../game-objects/item/types';
import { Command } from '../../../input/commands/Command';
import { ItemBlockCollisionHandler } from '../../handler/ItemBlockCollisionHandler';
import { ICollision } from '../../types';

export class PushItemLeftCommand extends Command<ItemBlockCollisionHandler> {
  constructor(item: IItem, block: IBlock, collision: ICollision) {
    super(new ItemBlockCollisionHandler(item, block, collision));
  }

  public override execute(): void {
    this.receiver.handleRightItemBlockCollision();
  }
}
