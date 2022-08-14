import { IBlock, IItemContainer } from '../../game-objects/block/types';
import { FireFlower } from '../../game-objects/item/FireFlower';
import { IPlayer } from '../../game-objects/player/types';
import { ICollidable } from '../../physics/types';
import { physics } from '../../utils/constants/Physics';
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

function handleTopPlayerBlockCollison(
  player: IPlayer,
  block: IBlock,
  collison: ICollision
) {
  player.location.subtract({
    x: 0,
    y: collison.intersection.height,
  });

  if (player.actionState.constructor.name === 'FallingActionState') {
    player.land();
    player.cutYVelocity();

    // StatManager.instance.resetConsecutivePoints();
  }
}

function handleBottomPlayerBlockCollision(
  player: IPlayer,
  block: IBlock,
  collison: ICollision
) {
  player.location.add({
    x: 0,
    y: collison.intersection.height,
  });

  if (player.actionState.constructor.name === 'JumpingActionState') {
    player.location.add({
      x: 0,
      y: collison.intersection.height,
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
  collison: ICollision
) {
  player.location.add({
    x: collison.intersection.width,
    y: 0,
  });

  if (player.velocity.x < 0) {
    player.cutXVelocity();
  }
}

function handleRightPlayerBlockCollision(
  player: IPlayer,
  block: IBlock,
  collison: ICollision
) {
  player.location.subtract({
    x: collison.intersection.width,
    y: 0,
  });

  if (player.velocity.x > 0) {
    player.cutXVelocity();
  }
}

function handleBottomNonSmallPlayerPowerUpBlockCollision(
  player: IPlayer,
  block: IBlock,
  collison: ICollision
) {
  player.location.add({
    x: 0,
    y: collison.intersection.height,
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
  collison: ICollision
) {
  player.location.add({
    x: 0,
    y: collison.intersection.height,
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
  collison: ICollision
) {
  player.location.add({
    x: 0,
    y: collison.intersection.height,
  });

  if (player.actionState.constructor.name === 'JumpingActionState') {
    player.applyImpulse(
      physics.blockBumpForce.subtract({ x: 0, y: player.velocity.y })
    );
    block.destroy();

    // StatManager.instance.gainPoints(collision.intersection, 'handleDestroyingPlayerBlockCollision');
    // SoundManager.instance.playSoundEffect('handleDestroyingPlayerBlockCollision');
  }
}

function handleTopPlayerPipeCollision(
  player: IPlayer,
  block: IBlock,
  collison: ICollision
) {
  if (player.actionState.constructor.name !== 'WarpingActionState') {
    player.location.subtract({
      x: 0,
      y: collison.intersection.height,
    });

    if (player.actionState.constructor.name === 'FallingActionState') {
      player.land();
      player.cutYVelocity();

      // StatManager.instance(resetConsecutivePoints()
    }
  }
}

function handleBottomPlayerPipeCollision(
  player: IPlayer,
  block: IBlock,
  collison: ICollision
) {
  if (player.actionState.constructor.name !== 'WarpingActionState') {
    if (player.actionState.constructor.name === 'JumpingActionState') {
      player.location.add({
        x: 0,
        y: collison.intersection.height,
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
  collison: ICollision
) {
  if (player.actionState.constructor.name !== 'WarpingActionState') {
    player.location.add({
      x: collison.intersection.width,
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
  collison: ICollision
) {
  if (player.actionState.constructor.name !== 'WarpingActionState') {
    player.location.subtract({
      x: collison.intersection.width,
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
  'SmallPowerUpState,ItemBrickBlock,TopCollision': handleTopPlayerBlockCollison,
  'SmallPowerUpState,ItemBrickBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'SmallPowerUpState,ItemBrickBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'SmallPowerUpState,ItemBrickBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'SmallPowerUpState,BrickBlock,TopCollision': handleTopPlayerBlockCollison,
  'SmallPowerUpState,BrickBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'SmallPowerUpState,BrickBlock,LeftCollision': handleLeftPlayerBlockCollision,
  'SmallPowerUpState,BrickBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'SmallPowerUpState,BrickCollectionBlock,TopCollision':
    handleTopPlayerBlockCollison,
  'SmallPowerUpState,BrickCollectionBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'SmallPowerUpState,BrickCollectionBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'SmallPowerUpState,BrickCollectionBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'SmallPowerUpState,HiddenBlock,BottomCollision':
    handleBottomPlayerHiddenBlockCollision,

  'SmallPowerUpState,NonPowerUpQuestionBlock,TopCollision':
    handleTopPlayerBlockCollison,
  'SmallPowerUpState,NonPowerUpQuestionBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'SmallPowerUpState,NonPowerUpQuestionBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'SmallPowerUpState,NonPowerUpQuestionBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'SmallPowerUpState,PowerUpQuestionBlock,TopCollision':
    handleTopPlayerBlockCollison,
  'SmallPowerUpState,PowerUpQuestionBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'SmallPowerUpState,PowerUpQuestionBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'SmallPowerUpState,PowerUpQuestionBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'SmallPowerUpState,FloorBlock,TopCollision': handleTopPlayerBlockCollison,
  'SmallPowerUpState,FloorBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'SmallPowerUpState,FloorBlock,LeftCollision': handleLeftPlayerBlockCollision,
  'SmallPowerUpState,FloorBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'SmallPowerUpState,StairBlock,TopCollision': handleTopPlayerBlockCollison,
  'SmallPowerUpState,StairBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'SmallPowerUpState,StairBlock,LeftCollision': handleLeftPlayerBlockCollision,
  'SmallPowerUpState,StairBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'SmallPowerUpState,UsedBlock,TopCollision': handleTopPlayerBlockCollison,
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
    handleTopPlayerBlockCollison,
  'SmallPowerUpState,LargeGreenPipeShaft,BottomCollision':
    handleBottomPlayerBlockCollision,
  'SmallPowerUpState,LargeGreenPipeShaft,LeftCollision':
    handleLeftPlayerBlockCollision,
  'SmallPowerUpState,LargeGreenPipeShaft,RightCollision':
    handleRightPlayerBlockCollision,

  'BigPowerUpState,ItemBrickBlock,TopCollision': handleTopPlayerBlockCollison,
  'BigPowerUpState,ItemBrickBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'BigPowerUpState,ItemBrickBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'BigPowerUpState,ItemBrickBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'BigPowerUpState,BrickBlock,TopCollision': handleTopPlayerBlockCollison,
  'BigPowerUpState,BrickBlock,BottomCollision':
    handleDestroyingPlayerBlockCollision,
  'BigPowerUpState,BrickBlock,LeftCollision': handleLeftPlayerBlockCollision,
  'BigPowerUpState,BrickBlock,RightCollision': handleRightPlayerBlockCollision,

  'BigPowerUpState,BrickCollectionBlock,TopCollision':
    handleTopPlayerBlockCollison,
  'BigPowerUpState,BrickCollectionBlock,BottomCollision':
    handleBottomPlayerBlockCollision, // TODO: Bug? should be destroy
  'BigPowerUpState,BrickCollectionBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'BigPowerUpState,BrickCollectionBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'BigPowerUpState,HiddenBlock,BottomCollision':
    handleBottomPlayerHiddenBlockCollision,

  'BigPowerUpState,NonPowerUpQuestionBlock,TopCollision':
    handleTopPlayerBlockCollison,
  'BigPowerUpState,NonPowerUpQuestionBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'BigPowerUpState,NonPowerUpQuestionBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'BigPowerUpState,NonPowerUpQuestionBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'BigPowerUpState,PowerUpQuestionBlock,TopCollision':
    handleTopPlayerBlockCollison,
  'BigPowerUpState,PowerUpQuestionBlock,BottomCollision':
    handleBottomNonSmallPlayerPowerUpBlockCollision,
  'BigPowerUpState,PowerUpQuestionBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'BigPowerUpState,PowerUpQuestionBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'BigPowerUpState,FloorBlock,TopCollision': handleTopPlayerBlockCollison,
  'BigPowerUpState,FloorBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'BigPowerUpState,FloorBlock,LeftCollision': handleLeftPlayerBlockCollision,
  'BigPowerUpState,FloorBlock,RightCollision': handleRightPlayerBlockCollision,

  'BigPowerUpState,StairBlock,TopCollision': handleTopPlayerBlockCollison,
  'BigPowerUpState,StairBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'BigPowerUpState,StairBlock,LeftCollision': handleLeftPlayerBlockCollision,
  'BigPowerUpState,StairBlock,RightCollision': handleRightPlayerBlockCollision,

  'BigPowerUpState,UsedBlock,TopCollision': handleTopPlayerBlockCollison,
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
    handleTopPlayerBlockCollison,
  'BigPowerUpState,LargeGreenPipeShaft,BottomCollision':
    handleBottomPlayerBlockCollision,
  'BigPowerUpState,LargeGreenPipeShaft,LeftCollision':
    handleLeftPlayerBlockCollision,
  'BigPowerUpState,LargeGreenPipeShaft,RightCollision':
    handleRightPlayerBlockCollision,

  'FirePowerUpState,ItemBrickBlock,TopCollision': handleTopPlayerBlockCollison,
  'FirePowerUpState,ItemBrickBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'FirePowerUpState,ItemBrickBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'FirePowerUpState,ItemBrickBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'FirePowerUpState,BrickBlock,TopCollision': handleTopPlayerBlockCollison,
  'FirePowerUpState,BrickBlock,BottomCollision':
    handleDestroyingPlayerBlockCollision,
  'FirePowerUpState,BrickBlock,LeftCollision': handleLeftPlayerBlockCollision,
  'FirePowerUpState,BrickBlock,RightCollision': handleRightPlayerBlockCollision,

  'FirePowerUpState,BrickCollectionBlock,TopCollision':
    handleTopPlayerBlockCollison,
  'FirePowerUpState,BrickCollectionBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'FirePowerUpState,BrickCollectionBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'FirePowerUpState,BrickCollectionBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'FirePowerUpState,HiddenBlock,BottomCollision':
    handleBottomPlayerHiddenBlockCollision,

  'FirePowerUpState,NonPowerUpQuestionBlock,TopCollision':
    handleTopPlayerBlockCollison,
  'FirePowerUpState,NonPowerUpQuestionBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'FirePowerUpState,NonPowerUpQuestionBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'FirePowerUpState,NonPowerUpQuestionBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'FirePowerUpState,PowerUpQuestionBlock,TopCollision':
    handleTopPlayerBlockCollison,
  'FirePowerUpState,PowerUpQuestionBlock,BottomCollision':
    handleBottomNonSmallPlayerPowerUpBlockCollision,
  'FirePowerUpState,PowerUpQuestionBlock,LeftCollision':
    handleLeftPlayerBlockCollision,
  'FirePowerUpState,PowerUpQuestionBlock,RightCollision':
    handleRightPlayerBlockCollision,

  'FirePowerUpState,FloorBlock,TopCollision': handleTopPlayerBlockCollison,
  'FirePowerUpState,FloorBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'FirePowerUpState,FloorBlock,LeftCollision': handleLeftPlayerBlockCollision,
  'FirePowerUpState,FloorBlock,RightCollision': handleRightPlayerBlockCollision,

  'FirePowerUpState,StairBlock,TopCollision': handleTopPlayerBlockCollison,
  'FirePowerUpState,StairBlock,BottomCollision':
    handleBottomPlayerBlockCollision,
  'FirePowerUpState,StairBlock,LeftCollision': handleLeftPlayerBlockCollision,
  'FirePowerUpState,StairBlock,RightCollision': handleRightPlayerBlockCollision,

  'FirePowerUpState,UsedBlock,TopCollision': handleTopPlayerBlockCollison,
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
