import { IPlayer } from '../../game-objects/player/types';
import { ICollidable } from '../../physics/types';
import { ICollision } from '../types';

export function respondToPlayerCameraCollision(
  player: ICollidable,
  camera: ICollidable,
  collision: ICollision
): void {
  if (playerCameraCollisionCommands[`${collision.direction}`]) {
    playerCameraCollisionCommands[`${collision.direction}`](
      player as IPlayer,
      collision
    );
  }
}

export function handleLeftPlayerCameraCollision(
  player: IPlayer,
  collision: ICollision
) {
  player.location.add({
    x: collision.intersection.width,
    y: 0,
  });
  player.cutXVelocity();
}

export function handleRightPlayerCameraCollision(
  player: IPlayer,
  collision: ICollision
) {
  player.location.subtract({
    x: collision.intersection.width,
    y: 0,
  });
  player.cutXVelocity();
}

const playerCameraCollisionCommands: {
  [key: string]: (player: IPlayer, collision: ICollision) => void;
} = {
  LeftCollision: handleLeftPlayerCameraCollision,
  RightCollision: handleRightPlayerCameraCollision,
};
