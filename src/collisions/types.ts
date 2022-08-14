import { ICamera } from '../display/types';
import { IPipe } from '../game-objects/block/types';
import { IPlayer } from '../game-objects/player/types';
import { IGameObject } from '../game-objects/types';
import { IRigidBody, ICollidable } from '../physics/types';

export interface ICollision {
  intersection: Phaser.Geom.Rectangle;
  direction: string;
}

export interface ICollisionManager {
  update(camera: ICamera): void;
  manageCollisions(
    collisionInstigator: IRigidBody,
    collisionReceiver: ICollidable
  ): void;
  manageCameraCollisions(
    collisionInstigator: IRigidBody,
    camera: ICollidable
  ): void;
  manageBlockCollisions(
    collisionInstigator: IRigidBody,
    blocks: IGameObject[]
  ): void;
  managePlayerPipeCollisions(player: IPlayer, pipe: IPipe): void;
}

export interface ICollisionResponder {
  respondToCollision(
    collisionInstigator: ICollidable,
    collisionReceiver: ICollidable,
    collisionSide: ICollision
  ): void;
}
