import { IBlock, IItemContainer } from '../../game-objects/block/types';
import { FireFlower } from '../../game-objects/item/FireFlower';
import { IPlayer } from '../../game-objects/player/types';
import { ICollidable } from '../../physics/types';
import {
  gainPoints,
  resetConsecutivePoints,
} from '../../statistics/statistics';
import { physics } from '../../utils/constants/physics';
import { ICollision } from '../types';

export function respondToPlayerBlockCollision(
  player: ICollidable,
  block: ICollidable,
  collision: ICollision
): void {
  const collisionType = `${(player as IPlayer).powerUpState.constructor.name},${
    block.constructor.name
  },${collision.direction}`;
  if (playerBlockCollisionCommands[collisionType]) {
    playerBlockCollisionCommands[collisionType](
      player as IPlayer,
      block as IBlock,
      collision
    );
  }
}

function handleTopPlayerBlockCollision(
  player: IPlayer,
  block: IBlock,
  collision: ICollision
) {
  player.location.subtract({
    x: 0,
    y: collision.intersection.height,
  });

  if (player.actionState.constructor.name === 'FallingActionState') {
    player.land();
    player.cutYVelocity();

    resetConsecutivePoints();
  }
}

function handleBottomPlayerBlockCollision(
  player: IPlayer,
  block: IBlock,
  collision: ICollision
) {
  player.location.add({
    x: 0,
    y: collision.intersection.height,
  });

  if (player.actionState.constructor.name === 'JumpingActionState') {
    player.location.add({
      x: 0,
      y: collision.intersection.height,
    });
    player.applyImpulse(
      physics.blockBumpForce.subtract({ x: 0, y: player.velocity.y })
    );
    block.bump();

    // StatManager.instance.playSoundEffect('handleBottomPlayerBlockCollision');
  }
}

function handleLeftPlayerBlockCollision(
  player: IPlayer,
  block: IBlock,
  collision: ICollision
) {
  player.location.add({
    x: collision.intersection.width,
    y: 0,
  });

  if (player.velocity.x < 0) {
    player.cutXVelocity();
  }
}

function handleRightPlayerBlockCollision(
  player: IPlayer,
  block: IBlock,
  collision: ICollision
) {
  player.location.subtract({
    x: collision.intersection.width,
    y: 0,
  });

  if (player.velocity.x > 0) {
    player.cutXVelocity();
  }
}

function handleBottomNonSmallPlayerPowerUpBlockCollision(
  player: IPlayer,
  block: IBlock,
  collision: ICollision
) {
  player.location.add({
    x: 0,
    y: collision.intersection.height,
  });

  if (player.actionState.constructor.name === 'JumpingActionState') {
    player.applyImpulse(
      physics.blockBumpForce.subtract({ x: 0, y: player.velocity.y })
    );
    (block as IItemContainer).itemType = FireFlower;
    block.bump();

    // SoundManager.instance.playSoundEffect('handleBottomNonSmallPlayerPowerUpBlockCollision')
  }
}

function handleBottomPlayerHiddenBlockCollision(
  player: IPlayer,
  block: IBlock,
  collision: ICollision
) {
  player.location.add({
    x: 0,
    y: collision.intersection.height,
  });

  if (player.actionState.constructor.name === 'JumpingActionState') {
    player.applyImpulse(
      physics.blockBumpForce.subtract({ x: 0, y: player.velocity.y })
    );
    block.bump();

    // SoundManager.instance.playSoundEffect('handleBottomPlayerHiddenBlockCollision')
  }
}

function handleDestroyingPlayerBlockCollision(
  player: IPlayer,
  block: IBlock,
  collision: ICollision
) {
  player.location.add({
    x: 0,
    y: collision.intersection.height,
  });

  if (player.actionState.constructor.name === 'JumpingActionState') {
    player.applyImpulse(
      physics.blockBumpForce.subtract({ x: 0, y: player.velocity.y })
    );
    block.destroy();

    gainPoints(collision.intersection, 'handleDestroyingPlayerBlockCollision');
    // SoundManager.instance.playSoundEffect('handleDestroyingPlayerBlockCollision');
  }
}

function handleTopPlayerPipeCollision(
  player: IPlayer,
  block: IBlock,
  collision: ICollision
) {
  if (player.actionState.constructor.name !== 'WarpingActionState') {
    player.location.subtract({
      x: 0,
      y: collision.intersection.height,
    });

    if (player.actionState.constructor.name === 'FallingActionState') {
      player.land();
      player.cutYVelocity();

      resetConsecutivePoints();
    }
  }
}

function handleBottomPlayerPipeCollision(
  player: IPlayer,
  block: IBlock,
  collision: ICollision
) {
  if (player.actionState.constructor.name !== 'WarpingActionState') {
    if (player.actionState.constructor.name === 'JumpingActionState') {
      player.location.add({
        x: 0,
        y: collision.intersection.height,
      });
      player.applyImpulse(
        physics.blockBumpForce.subtract({ x: 0, y: player.velocity.y })
      );
      block.bump();

      // SoundManager.instance.playSoundEffect('handleTopPlayerPipeCollision');
    }
  }
}

function handleLeftPlayerPipeCollision(
  player: IPlayer,
  block: IBlock,
  collision: ICollision
) {
  if (player.actionState.constructor.name !== 'WarpingActionState') {
    player.location.add({
      x: collision.intersection.width,
      y: 0,
    });

    if (player.velocity.x < 0) {
      player.cutXVelocity();
    }
  }
}

function handleRightPlayerPipeCollision(
  player: IPlayer,
  block: IBlock,
  collision: ICollision
) {
  if (player.actionState.constructor.name !== 'WarpingActionState') {
    player.location.subtract({
      x: collision.intersection.width,
      y: 0,
    });

    if (player.velocity.x > 0) {
      player.cutXVelocity();
    }
  }
}

const playerBlockCollisionCommands: {
  [key: string]: (
    player: IPlayer,
    block: IBlock,
    collision: ICollision
  ) => void;
} = {
  'SmallPowerUpState,ItemBrickBlock,TopCollision':
    handleTopPlayerBlockCollision,
  'SmallPowerUpState,ItemBrickBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'SmallPowerUpState,ItemBrickBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'SmallPowerUpState,ItemBrickBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'SmallPowerUpState,BrickBlock,TopCollision': handleTopPlayerBlockCollision,
  'SmallPowerUpState,BrickBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'SmallPowerUpState,BrickBlock,LeftCollision': handleLeftPlayerBlockCollision,
  'SmallPowerUpState,BrickBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'SmallPowerUpState,BrickCollectionBlock,TopCollision':
    handleTopPlayerBlockCollision,
  'SmallPowerUpState,BrickCollectionBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'SmallPowerUpState,BrickCollectionBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'SmallPowerUpState,BrickCollectionBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'SmallPowerUpState,HiddenBlock,BottomCollision':
    handleBottomPlayerHiddenBlockCollision,

  'SmallPowerUpState,NonPowerUpQuestionBlock,TopCollision':
    handleTopPlayerBlockCollision,
  'SmallPowerUpState,NonPowerUpQuestionBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'SmallPowerUpState,NonPowerUpQuestionBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'SmallPowerUpState,NonPowerUpQuestionBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'SmallPowerUpState,PowerUpQuestionBlock,TopCollision':
    handleTopPlayerBlockCollision,
  'SmallPowerUpState,PowerUpQuestionBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'SmallPowerUpState,PowerUpQuestionBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'SmallPowerUpState,PowerUpQuestionBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'SmallPowerUpState,FloorBlock,TopCollision': handleTopPlayerBlockCollision,
  'SmallPowerUpState,FloorBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'SmallPowerUpState,FloorBlock,LeftCollision': handleLeftPlayerBlockCollision,
  'SmallPowerUpState,FloorBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'SmallPowerUpState,StairBlock,TopCollision': handleTopPlayerBlockCollision,
  'SmallPowerUpState,StairBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'SmallPowerUpState,StairBlock,LeftCollision': handleLeftPlayerBlockCollision,
  'SmallPowerUpState,StairBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'SmallPowerUpState,UsedBlock,TopCollision': handleTopPlayerBlockCollision,
  'SmallPowerUpState,UsedBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'SmallPowerUpState,UsedBlock,LeftCollision': handleLeftPlayerBlockCollision,
  'SmallPowerUpState,UsedBlock,RightCollision': handleRightPlayerBlockCollision,

  'SmallPowerUpState,SmallVerticalGreenPipe,TopCollision':
    handleTopPlayerPipeCollision,
  'SmallPowerUpState,SmallVerticalGreenPipe,BottomCollision':
    handleBottomPlayerPipeCollision,
  'SmallPowerUpState,SmallVerticalGreenPipe,LeftCollision':
    handleLeftPlayerPipeCollision,
  'SmallPowerUpState,SmallVerticalGreenPipe,RightCollision':
    handleRightPlayerPipeCollision,

  'SmallPowerUpState,MediumVerticalGreenPipe,TopCollision':
    handleTopPlayerPipeCollision,
  'SmallPowerUpState,MediumVerticalGreenPipe,BottomCollision':
    handleBottomPlayerPipeCollision,
  'SmallPowerUpState,MediumVerticalGreenPipe,LeftCollision':
    handleLeftPlayerPipeCollision,
  'SmallPowerUpState,MediumVerticalGreenPipe,RightCollision':
    handleRightPlayerPipeCollision,

  'SmallPowerUpState,LargeVerticalGreenPipe,TopCollision':
    handleTopPlayerPipeCollision,
  'SmallPowerUpState,LargeVerticalGreenPipe,BottomCollision':
    handleBottomPlayerPipeCollision,
  'SmallPowerUpState,LargeVerticalGreenPipe,LeftCollision':
    handleLeftPlayerPipeCollision,
  'SmallPowerUpState,LargeVerticalGreenPipe,RightCollision':
    handleRightPlayerPipeCollision,

  'SmallPowerUpState,HorizontalGreenPipe,TopCollision':
    handleTopPlayerPipeCollision,
  'SmallPowerUpState,HorizontalGreenPipe,BottomCollision':
    handleBottomPlayerPipeCollision,
  'SmallPowerUpState,HorizontalGreenPipe,LeftCollision':
    handleLeftPlayerPipeCollision,
  'SmallPowerUpState,HorizontalGreenPipe,RightCollision':
    handleRightPlayerPipeCollision,

  'SmallPowerUpState,LargeGreenPipeShaft,TopCollision':
    handleTopPlayerBlockCollision,
  'SmallPowerUpState,LargeGreenPipeShaft,BottomCollision':
    handleBottomPlayerBlockCollision,
  'SmallPowerUpState,LargeGreenPipeShaft,LeftCollision':
    handleLeftPlayerBlockCollision,
  'SmallPowerUpState,LargeGreenPipeShaft,RightCollision':
    handleRightPlayerBlockCollision,

  'BigPowerUpState,ItemBrickBlock,TopCollision': handleTopPlayerBlockCollision,
  'BigPowerUpState,ItemBrickBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'BigPowerUpState,ItemBrickBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'BigPowerUpState,ItemBrickBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'BigPowerUpState,BrickBlock,TopCollision': handleTopPlayerBlockCollision,
  'BigPowerUpState,BrickBlock,BottomCollision':
    handleDestroyingPlayerBlockCollision,
  'BigPowerUpState,BrickBlock,LeftCollision': handleLeftPlayerBlockCollision,
  'BigPowerUpState,BrickBlock,RightCollision': handleRightPlayerBlockCollision,

  'BigPowerUpState,BrickCollectionBlock,TopCollision':
    handleTopPlayerBlockCollision,
  'BigPowerUpState,BrickCollectionBlock,BottomCollision':
    handleBottomPlayerBlockCollision, // TODO: Bug? should be destroy
  'BigPowerUpState,BrickCollectionBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'BigPowerUpState,BrickCollectionBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'BigPowerUpState,HiddenBlock,BottomCollision':
    handleBottomPlayerHiddenBlockCollision,

  'BigPowerUpState,NonPowerUpQuestionBlock,TopCollision':
    handleTopPlayerBlockCollision,
  'BigPowerUpState,NonPowerUpQuestionBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'BigPowerUpState,NonPowerUpQuestionBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'BigPowerUpState,NonPowerUpQuestionBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'BigPowerUpState,PowerUpQuestionBlock,TopCollision':
    handleTopPlayerBlockCollision,
  'BigPowerUpState,PowerUpQuestionBlock,BottomCollision':
    handleBottomNonSmallPlayerPowerUpBlockCollision,
  'BigPowerUpState,PowerUpQuestionBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'BigPowerUpState,PowerUpQuestionBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'BigPowerUpState,FloorBlock,TopCollision': handleTopPlayerBlockCollision,
  'BigPowerUpState,FloorBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'BigPowerUpState,FloorBlock,LeftCollision': handleLeftPlayerBlockCollision,
  'BigPowerUpState,FloorBlock,RightCollision': handleRightPlayerBlockCollision,

  'BigPowerUpState,StairBlock,TopCollision': handleTopPlayerBlockCollision,
  'BigPowerUpState,StairBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'BigPowerUpState,StairBlock,LeftCollision': handleLeftPlayerBlockCollision,
  'BigPowerUpState,StairBlock,RightCollision': handleRightPlayerBlockCollision,

  'BigPowerUpState,UsedBlock,TopCollision': handleTopPlayerBlockCollision,
  'BigPowerUpState,UsedBlock,BottomCollision': handleBottomPlayerBlockCollision,
  'BigPowerUpState,UsedBlock,LeftCollision': handleLeftPlayerBlockCollision,
  'BigPowerUpState,UsedBlock,RightCollision': handleRightPlayerBlockCollision,

  'BigPowerUpState,SmallVerticalGreenPipe,TopCollision':
    handleTopPlayerPipeCollision,
  'BigPowerUpState,SmallVerticalGreenPipe,BottomCollision':
    handleBottomPlayerPipeCollision,
  'BigPowerUpState,SmallVerticalGreenPipe,LeftCollision':
    handleLeftPlayerPipeCollision,
  'BigPowerUpState,SmallVerticalGreenPipe,RightCollision':
    handleRightPlayerPipeCollision,

  'BigPowerUpState,MediumVerticalGreenPipe,TopCollision':
    handleTopPlayerPipeCollision,
  'BigPowerUpState,MediumVerticalGreenPipe,BottomCollision':
    handleBottomPlayerPipeCollision,
  'BigPowerUpState,MediumVerticalGreenPipe,LeftCollision':
    handleLeftPlayerPipeCollision,
  'BigPowerUpState,MediumVerticalGreenPipe,RightCollision':
    handleRightPlayerPipeCollision,

  'BigPowerUpState,LargeVerticalGreenPipe,TopCollision':
    handleTopPlayerPipeCollision,
  'BigPowerUpState,LargeVerticalGreenPipe,BottomCollision':
    handleBottomPlayerPipeCollision,
  'BigPowerUpState,LargeVerticalGreenPipe,LeftCollision':
    handleLeftPlayerPipeCollision,
  'BigPowerUpState,LargeVerticalGreenPipe,RightCollision':
    handleRightPlayerPipeCollision,

  'BigPowerUpState,HorizontalGreenPipe,TopCollision':
    handleTopPlayerPipeCollision,
  'BigPowerUpState,HorizontalGreenPipe,BottomCollision':
    handleBottomPlayerPipeCollision,
  'BigPowerUpState,HorizontalGreenPipe,LeftCollision':
    handleLeftPlayerPipeCollision,
  'BigPowerUpState,HorizontalGreenPipe,RightCollision':
    handleRightPlayerPipeCollision,

  'BigPowerUpState,LargeGreenPipeShaft,TopCollision':
    handleTopPlayerBlockCollision,
  'BigPowerUpState,LargeGreenPipeShaft,BottomCollision':
    handleBottomPlayerBlockCollision,
  'BigPowerUpState,LargeGreenPipeShaft,LeftCollision':
    handleLeftPlayerBlockCollision,
  'BigPowerUpState,LargeGreenPipeShaft,RightCollision':
    handleRightPlayerBlockCollision,

  'FirePowerUpState,ItemBrickBlock,TopCollision': handleTopPlayerBlockCollision,
  'FirePowerUpState,ItemBrickBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'FirePowerUpState,ItemBrickBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'FirePowerUpState,ItemBrickBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'FirePowerUpState,BrickBlock,TopCollision': handleTopPlayerBlockCollision,
  'FirePowerUpState,BrickBlock,BottomCollision':
    handleDestroyingPlayerBlockCollision,
  'FirePowerUpState,BrickBlock,LeftCollision': handleLeftPlayerBlockCollision,
  'FirePowerUpState,BrickBlock,RightCollision': handleRightPlayerBlockCollision,

  'FirePowerUpState,BrickCollectionBlock,TopCollision':
    handleTopPlayerBlockCollision,
  'FirePowerUpState,BrickCollectionBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'FirePowerUpState,BrickCollectionBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'FirePowerUpState,BrickCollectionBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'FirePowerUpState,HiddenBlock,BottomCollision':
    handleBottomPlayerHiddenBlockCollision,

  'FirePowerUpState,NonPowerUpQuestionBlock,TopCollision':
    handleTopPlayerBlockCollision,
  'FirePowerUpState,NonPowerUpQuestionBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'FirePowerUpState,NonPowerUpQuestionBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'FirePowerUpState,NonPowerUpQuestionBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'FirePowerUpState,PowerUpQuestionBlock,TopCollision':
    handleTopPlayerBlockCollision,
  'FirePowerUpState,PowerUpQuestionBlock,BottomCollision':
    handleBottomNonSmallPlayerPowerUpBlockCollision,
  'FirePowerUpState,PowerUpQuestionBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'FirePowerUpState,PowerUpQuestionBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'FirePowerUpState,FloorBlock,TopCollision': handleTopPlayerBlockCollision,
  'FirePowerUpState,FloorBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'FirePowerUpState,FloorBlock,LeftCollision': handleLeftPlayerBlockCollision,
  'FirePowerUpState,FloorBlock,RightCollision': handleRightPlayerBlockCollision,

  'FirePowerUpState,StairBlock,TopCollision': handleTopPlayerBlockCollision,
  'FirePowerUpState,StairBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'FirePowerUpState,StairBlock,LeftCollision': handleLeftPlayerBlockCollision,
  'FirePowerUpState,StairBlock,RightCollision': handleRightPlayerBlockCollision,

  'FirePowerUpState,UsedBlock,TopCollision': handleTopPlayerBlockCollision,
  'FirePowerUpState,UsedBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'FirePowerUpState,UsedBlock,LeftCollision': handleLeftPlayerBlockCollision,
  'FirePowerUpState,UsedBlock,RightCollision': handleRightPlayerBlockCollision,

  'FirePowerUpState,SmallVerticalGreenPipe,TopCollision':
    handleTopPlayerPipeCollision,
  'FirePowerUpState,SmallVerticalGreenPipe,BottomCollision':
    handleBottomPlayerPipeCollision,
  'FirePowerUpState,SmallVerticalGreenPipe,LeftCollision':
    handleLeftPlayerPipeCollision,
  'FirePowerUpState,SmallVerticalGreenPipe,RightCollision':
    handleRightPlayerPipeCollision,

  'FirePowerUpState,MediumVerticalGreenPipe,TopCollision':
    handleTopPlayerPipeCollision,
  'FirePowerUpState,MediumVerticalGreenPipe,BottomCollision':
    handleBottomPlayerPipeCollision,
  'FirePowerUpState,MediumVerticalGreenPipe,LeftCollision':
    handleLeftPlayerPipeCollision,
  'FirePowerUpState,MediumVerticalGreenPipe,RightCollision':
    handleRightPlayerPipeCollision,

  'FirePowerUpState,LargeVerticalGreenPipe,TopCollision':
    handleTopPlayerPipeCollision,
  'FirePowerUpState,LargeVerticalGreenPipe,BottomCollision':
    handleBottomPlayerPipeCollision,
  'FirePowerUpState,LargeVerticalGreenPipe,LeftCollision':
    handleLeftPlayerPipeCollision,
  'FirePowerUpState,LargeVerticalGreenPipe,RightCollision':
    handleRightPlayerPipeCollision,

  'FirePowerUpState,HorizontalGreenPipe,TopCollision':
    handleTopPlayerPipeCollision,
  'FirePowerUpState,HorizontalGreenPipe,BottomCollision':
    handleBottomPlayerPipeCollision,
  'FirePowerUpState,HorizontalGreenPipe,LeftCollision':
    handleLeftPlayerPipeCollision,
  'FirePowerUpState,HorizontalGreenPipe,RightCollision':
    handleRightPlayerPipeCollision,

  'FirePowerUpState,LargeGreenPipeShaft,TopCollision':
    handleTopPlayerPipeCollision,
  'FirePowerUpState,LargeGreenPipeShaft,BottomCollision':
    handleBottomPlayerPipeCollision,
  'FirePowerUpState,LargeGreenPipeShaft,LeftCollision':
    handleLeftPlayerPipeCollision,
  'FirePowerUpState,LargeGreenPipeShaft,RightCollision':
    handleRightPlayerPipeCollision,
};
