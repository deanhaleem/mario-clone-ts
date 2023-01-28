/* eslint-disable @typescript-eslint/no-unused-vars */
import { IPipe } from '../../game-objects/block/types';
import { BlinkingMario } from '../../game-objects/player/BlinkingMario';
import { IPlayer } from '../../game-objects/player/types';
import { Directions, ICollidable } from '../../physics/types';
import { physics } from '../../utils/constants/physics';
import { ICollision } from '../types';

export function respondToPlayerWarpPipeCollision(
  player: ICollidable,
  pipe: ICollidable,
  collision: ICollision
): void {
  if (
    playerWarpPipeCollisionCommands[
      `${pipe.constructor.name},${collision.direction}`
    ]
  ) {
    playerWarpPipeCollisionCommands[
      `${pipe.constructor.name},${collision.direction}`
    ](player as IPlayer, pipe as IPipe);
  }
}

function handleTopPlayerWarpPipeCollision(player: IPlayer, pipe: IPipe) {
  if (player.canWarp) {
    if (player.constructor.name === 'BlinkingMario') {
      (player as BlinkingMario).removeDecorator();
    }
    player.warp(pipe.warpLocation, physics.verticalWarpVelocity);
  }
}

function handleBottomPlayerWarpPipeCollision(player: IPlayer, pipe: IPipe) {
  player.warp(Phaser.Math.Vector2.ZERO, physics.verticalWarpVelocity.negate());
}

function handleRightPlayerWarpPipeCollision(player: IPlayer, pipe: IPipe) {
  if (
    player.direction === Directions.Right &&
    (player.actionState.constructor.name === 'RunningActionState' ||
      player.actionState.constructor.name === 'WalkingActionState')
  ) {
    if (player.constructor.name === 'BlinkingMario') {
      (player as BlinkingMario).removeDecorator();
    }
    player.warp(pipe.warpLocation, physics.horizontalWarpVelocity);
  }
}

const playerWarpPipeCollisionCommands: {
  [key: string]: (player: IPlayer, pipe: IPipe) => void;
} = {
  'LargeVerticalGreenPipe,TopCollision': handleTopPlayerWarpPipeCollision,
  'SmallVerticalGreenPipe,TopCollision': handleTopPlayerWarpPipeCollision,
  'SmallVerticalGreenPipe,BottomCollision': handleBottomPlayerWarpPipeCollision,
  'HorizontalGreenPipe,RightCollision': handleRightPlayerWarpPipeCollision,
};
