import { IBlock } from '../../game-objects/block/types';
import { IItem } from '../../game-objects/item/types';
import { ICollidable } from '../../physics/types';
import { ICollision } from '../types';

export function respondToItemBlockCollision(
  item: ICollidable,
  block: ICollidable,
  collision: ICollision
): void {
  if (itemBlockCollisionCommands[`${collision.direction}`]) {
    itemBlockCollisionCommands[`${collision.direction}`](
      item as IItem,
      block as IBlock,
      collision
    );
  }
}

function handleTopItemBlockCollision(
  item: IItem,
  block: IBlock,
  collision: ICollision
) {
  item.location.subtract({
    x: 0,
    y: collision.intersection.height,
  });
  item.land();
}

function handleBottomItemBlockCollision(
  item: IItem,
  block: IBlock,
  collision: ICollision
) {
  item.location.add({
    x: 0,
    y: collision.intersection.height,
  });
}

function handleLeftItemBlockCollision(
  item: IItem,
  block: IBlock,
  collision: ICollision
) {
  item.location.add({
    x: collision.intersection.width,
    y: 0,
  });
  item.changeDirection();
}

function handleRightItemBlockCollision(
  item: IItem,
  block: IBlock,
  collision: ICollision
) {
  item.location.subtract({
    x: collision.intersection.width,
    y: 0,
  });
  item.changeDirection();
}

const itemBlockCollisionCommands: {
  [key: string]: (item: IItem, block: IBlock, collision: ICollision) => void;
} = {
  TopCollision: handleTopItemBlockCollision,
  BottomCollision: handleBottomItemBlockCollision,
  LeftCollision: handleLeftItemBlockCollision,
  RightCollision: handleRightItemBlockCollision,
};
