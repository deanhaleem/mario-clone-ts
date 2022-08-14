import { ICamera } from '../display/types';
import { IPipe } from '../game-objects/block/types';
import { IPlayer } from '../game-objects/player/types';
import { IGameObject } from '../game-objects/types';
import { ILevel } from '../level/types';
import { ICollidable, IRigidBody } from '../physics/types';
import { offsets } from '../utils/constants/Offsets';
import { Collision } from './Collision';
import {
  collidableAreSideBySide,
  collidableAreStackable,
  detectCollision,
  detectIfLeftOrRightCollision,
  detectIfTopOrBottomCollision,
  getCollidableType,
} from './Collisions';
import { CollisionSecretary } from './CollisionSecretary';
import { ICollisionManager, ICollisionResponder } from './types';

export class CollisionManager implements ICollisionManager {
  private readonly collisionResponders: { [x: string]: ICollisionResponder };
  private readonly collisionSecretary: CollisionSecretary;
  private readonly level: ILevel;

  constructor(level: ILevel) {
    this.collisionResponders = CollisionSecretary.loadCollisionResponders();
    this.collisionSecretary = new CollisionSecretary(this);
    this.level = level;
  }

  public update(camera: ICamera): void {
    this.collisionSecretary.schedulePotentialCollisions(
      this.level.getObjectsOnScreen(camera.hitbox)
    );
    this.collisionSecretary.manageCollisions(camera);
  }

  public manageCollisions(
    collisionInstigator: IRigidBody,
    collisionReceiver: ICollidable
  ): void {
    const collision = detectCollision(
      collisionInstigator,
      collisionReceiver.hitbox
    );
    const collisionType = `${getCollidableType(
      collisionInstigator
    )},${getCollidableType(collisionReceiver)}`;
    if (this.collisionResponders[collisionType]) {
      this.collisionResponders[collisionType].respondToCollision(
        collisionInstigator,
        collisionReceiver,
        collision
      );
    }
  }

  public manageCameraCollisions(
    collisionInstigator: IRigidBody,
    camera: ICollidable
  ): void {
    const leftCameraHitbox = new Phaser.Geom.Rectangle(
      camera.hitbox.x - offsets.tile,
      camera.hitbox.y,
      offsets.tile,
      camera.hitbox.height
    );
    const rightCameraHitbox = new Phaser.Geom.Rectangle(
      camera.hitbox.x + camera.hitbox.width,
      camera.hitbox.y,
      offsets.tile,
      camera.hitbox.height
    );

    let collision = new Collision(
      new Phaser.Geom.Rectangle(),
      'BottomCollision'
    );
    if (
      collisionInstigator.hitbox.contains(
        leftCameraHitbox.x,
        leftCameraHitbox.y
      ) ||
      collisionInstigator.hitbox.contains(
        rightCameraHitbox.x,
        rightCameraHitbox.y
      )
    ) {
      collision = detectCollision(
        collisionInstigator,
        collisionInstigator.hitbox.contains(
          leftCameraHitbox.x,
          leftCameraHitbox.y
        )
          ? leftCameraHitbox
          : rightCameraHitbox
      );
    }

    const collisionType = `${getCollidableType(collisionInstigator)}ICamera`;
    if (this.collisionResponders[collisionType]) {
      this.collisionResponders[collisionType].respondToCollision(
        collisionInstigator,
        camera,
        collision
      );
    }
  }

  public manageBlockCollisions(
    collisionInstigator: IRigidBody,
    blocks: IGameObject[]
  ): void {
    //console.log(collisionInstigator);
    if (collidableAreSideBySide(blocks[0].hitbox, blocks[1].hitbox)) {
      const firstCollision = detectIfTopOrBottomCollision(
        collisionInstigator.hitbox,
        blocks[0].hitbox
      );
      const secondCollision = detectIfTopOrBottomCollision(
        collisionInstigator.hitbox,
        blocks[1].hitbox
      );
      this.manageCollisions(
        collisionInstigator,
        firstCollision.intersection.height > secondCollision.intersection.height
          ? blocks[0]
          : blocks[1]
      );
    } else if (collidableAreStackable(blocks[0].hitbox, blocks[1].hitbox)) {
      const firstCollision = detectIfLeftOrRightCollision(
        collisionInstigator.hitbox,
        blocks[0].hitbox
      );
      const secondCollision = detectIfLeftOrRightCollision(
        collisionInstigator.hitbox,
        blocks[1].hitbox
      );
      this.manageCollisions(
        collisionInstigator,
        firstCollision.intersection.width > secondCollision.intersection.width
          ? blocks[0]
          : blocks[1]
      );
    } else {
      this.manageCollisions(collisionInstigator, blocks[0]);
      this.manageCollisions(collisionInstigator, blocks[1]);
    }
  }

  public managePlayerPipeCollisions(player: IPlayer, pipe: IPipe): void {
    if (!pipe.warpLocation.equals({ x: 0, y: 0 })) {
      if (
        player.extendedHitbox.contains(pipe.warpHitbox.x, pipe.warpHitbox.y)
      ) {
        const collisionType = `${getCollidableType(player)},IPipe`;
        if (this.collisionResponders[collisionType]) {
          this.collisionResponders[collisionType].respondToCollision(
            player,
            pipe,
            detectCollision(player, pipe.hitbox)
          );
        }
      } else {
        if (
          pipe.hitbox.contains(player.hitbox.centerX, player.hitbox.centerY)
        ) {
          const collisionType = `${getCollidableType(player)}IPipe`;
          if (this.collisionResponders[collisionType]) {
            this.collisionResponders[collisionType].respondToCollision(
              player,
              pipe,
              new Collision(new Phaser.Geom.Rectangle(), 'BottomCollision')
            );
          }
        }
      }
    }
  }
}
