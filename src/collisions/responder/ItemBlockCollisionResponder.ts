import { ICommand } from '../../input/types';
import { ICollidable } from '../../physics/types';
import { Constructor } from '../../types';
import { PushItemDownCommand } from '../command/item/PushItemDownCommand';
import { PushItemLeftCommand } from '../command/item/PushItemLeftCommand';
import { PushItemRightCommand } from '../command/item/PushItemRightCommand';
import { PushItemUpCommand } from '../command/item/PushItemUpCommand';
import { ICollision, ICollisionResponder } from '../types';

export class ItemBlockCollisionResponder implements ICollisionResponder {
  private readonly itemBlockCollisionCommands: {
    [key: string]: Constructor<ICommand>;
  };

  public respondToCollision(
    item: ICollidable,
    block: ICollidable,
    collision: ICollision
  ): void {
    if (this.itemBlockCollisionCommands[`${collision.direction}`]) {
      new this.itemBlockCollisionCommands[`${collision.direction}`](
        item,
        block,
        collision
      ).execute();
    }
  }

  constructor() {
    this.itemBlockCollisionCommands = {
      TopCollision: PushItemUpCommand,
      BottomCollision: PushItemDownCommand,
      LeftCollision: PushItemRightCommand,
      RightCollision: PushItemLeftCommand,
    };
  }
}
