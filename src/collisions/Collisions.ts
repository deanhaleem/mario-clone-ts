import { ICamera } from '../display/types';
import { IPipe } from '../game-objects/block/types';
import { IPlayer } from '../game-objects/player/types';
import { IGameObject } from '../game-objects/types';
import { ILevel } from '../level/types';
import { ICollidable, IRigidBody } from '../physics/types';
import { offsets } from '../utils/constants/Offsets';
import { utilities } from '../utils/constants/Utilities';
import { respondToEnemyBlockCollision } from './responder/EnemyBlockCollisionResponder';
import { respondToEnemyCameraCollision } from './responder/EnemyCameraCollisionResponder';
import { respondToEnemyEnemyCollision } from './responder/EnemyEnemyCollisionResponder';
import { respondToEnemyProjectileCollision } from './responder/EnemyProjectileCollisionResponder';
import { respondToItemBlockCollision } from './responder/ItemBlockCollisionResponder';
import { respondToPlayerBlockCollision } from './responder/PlayerBlockCollisionResponder';
import { respondToPlayerCameraCollision } from './responder/PlayerCameraCollisionResponder';
import { respondToPlayerEnemyCollision } from './responder/PlayerEnemyCollisionResponder';
import { respondToPlayerItemCollision } from './responder/PlayerItemCollisionResponder';
import { respondToPlayerWarpPipeCollision } from './responder/PlayerWarpPipeCollisionResponder';
import { respondToProjectileBlockCollision } from './responder/ProjectileBlockCollisionResponder';
import { ICollision } from './types';

export function manageCollisions(camera: ICamera, level: ILevel) {
  const movingGameObjects: IRigidBody[] = [];
  const stationaryGameObjects: IGameObject[] = [];

  const gameObjectsOnScreen = level.getObjectsOnScreen(camera.hitbox);
  gameObjectsOnScreen.forEach((gameObject) => {
    if (gameObject.collisionDetails.kinematic) {
      movingGameObjects.push(gameObject as unknown as IRigidBody);
    } else {
      stationaryGameObjects.push(gameObject);
    }
  });

  for (let i = 0; i < movingGameObjects.length; i++) {
    for (let j = i + 1; j < movingGameObjects.length; j++) {
      if (
        movingGameObjects[i].hitbox.contains(
          movingGameObjects[j].hitbox.x,
          movingGameObjects[j].hitbox.y
        )
      ) {
        manageCollision(movingGameObjects[i], movingGameObjects[j]);
      }
    }

    const blocksIntersecting: IGameObject[] = [];
    const blocksOnTopOf: IGameObject[] = [];
    stationaryGameObjects.forEach((stationaryGameObject) => {
      if (
        !Phaser.Geom.Intersects.GetRectangleIntersection(
          movingGameObjects[i].hitbox,
          stationaryGameObject.hitbox
        ).isEmpty()
      ) {
        blocksIntersecting.push(stationaryGameObject);
      }

      if (
        !Phaser.Geom.Intersects.GetRectangleIntersection(
          movingGameObjects[i].extendedHitbox,
          stationaryGameObject.hitbox
        ).isEmpty()
      ) {
        blocksOnTopOf.push(stationaryGameObject);
      }
    });

    if (movingGameObjects[i].collisionDetails.interface === 'IPlayer') {
      blocksIntersecting.forEach((gameObject) => {
        if (gameObject.collisionDetails.interface === 'IPipe') {
          managePlayerPipeCollisions(
            movingGameObjects[i] as IPlayer,
            gameObject as IPipe
          );
        }
      });

      blocksOnTopOf.forEach((gameObject) => {
        if (gameObject.collisionDetails.interface === 'IPipe') {
          managePlayerPipeCollisions(
            movingGameObjects[i] as IPlayer,
            gameObject as IPipe
          );
        }
      });
    }

    if (blocksIntersecting.length === utilities.maxIntersectingBlocks) {
      manageBlockCollisions(movingGameObjects[i], blocksIntersecting);
    } else if (
      blocksIntersecting.length === utilities.normalIntersectingBlocks
    ) {
      manageCollision(
        movingGameObjects[i],
        blocksIntersecting[0] as unknown as IRigidBody
      );
    }

    if (blocksOnTopOf.length === 0) {
      movingGameObjects[i].fall();
    }

    if (
      movingGameObjects[i].hitbox.contains(camera.hitbox.x, camera.hitbox.y)
    ) {
      manageCameraCollisions(movingGameObjects[i], camera);
    }
  }
}

function manageCollision(
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
  if (collisionResponders[collisionType]) {
    collisionResponders[collisionType](
      collisionInstigator,
      collisionReceiver,
      collision
    );
  }
}

function manageCameraCollisions(
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

  let collision: ICollision = {
    intersection: new Phaser.Geom.Rectangle(),
    direction: 'BottomCollision',
  };
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
  if (collisionResponders[collisionType]) {
    collisionResponders[collisionType](collisionInstigator, camera, collision);
  }
}

function manageBlockCollisions(
  collisionInstigator: IRigidBody,
  blocks: IGameObject[]
): void {
  if (collidableAreSideBySide(blocks[0].hitbox, blocks[1].hitbox)) {
    const firstCollision = detectIfTopOrBottomCollision(
      collisionInstigator.hitbox,
      blocks[0].hitbox
    );
    const secondCollision = detectIfTopOrBottomCollision(
      collisionInstigator.hitbox,
      blocks[1].hitbox
    );
    manageCollision(
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
    manageCollision(
      collisionInstigator,
      firstCollision.intersection.width > secondCollision.intersection.width
        ? blocks[0]
        : blocks[1]
    );
  } else {
    manageCollision(collisionInstigator, blocks[0]);
    manageCollision(collisionInstigator, blocks[1]);
  }
}

function managePlayerPipeCollisions(player: IPlayer, pipe: IPipe): void {
  if (!pipe.warpLocation.equals({ x: 0, y: 0 })) {
    if (player.extendedHitbox.contains(pipe.warpHitbox.x, pipe.warpHitbox.y)) {
      const collisionType = `${getCollidableType(player)},IPipe`;
      if (collisionResponders[collisionType]) {
        collisionResponders[collisionType](
          player,
          pipe,
          detectCollision(player, pipe.hitbox)
        );
      }
    } else {
      if (pipe.hitbox.contains(player.hitbox.centerX, player.hitbox.centerY)) {
        const collisionType = `${getCollidableType(player)}IPipe`;
        if (collisionResponders[collisionType]) {
          collisionResponders[collisionType](player, pipe, {
            intersection: new Phaser.Geom.Rectangle(),
            direction: 'BottomCollision',
          });
        }
      }
    }
  }
}

function detectCollision(
  rigidBody: IRigidBody,
  collisionReceiver: Phaser.Geom.Rectangle
) {
  const previousHitBox = new Phaser.Geom.Rectangle(
    rigidBody.hitbox.x - Math.round(rigidBody.velocity.x),
    rigidBody.hitbox.y - Math.round(rigidBody.velocity.y),
    rigidBody.hitbox.width,
    rigidBody.hitbox.height
  );

  const maxVelocity =
    Math.abs(rigidBody.velocity.x) > Math.abs(rigidBody.velocity.y)
      ? Math.abs(rigidBody.velocity.x)
      : Math.abs(rigidBody.velocity.y);

  let firstCollisionHitBox = new Phaser.Geom.Rectangle();
  for (
    let delta = 0;
    delta <= maxVelocity && firstCollisionHitBox.isEmpty();
    delta += 1
  ) {
    previousHitBox.setPosition(
      previousHitBox.x === rigidBody.hitbox.x
        ? 0
        : rigidBody.velocity.x < 0
        ? -delta
        : delta,
      previousHitBox.y === rigidBody.hitbox.y
        ? 0
        : rigidBody.velocity.y < 0
        ? -delta
        : delta
    );

    if (previousHitBox.contains(collisionReceiver.x, collisionReceiver.y)) {
      firstCollisionHitBox = previousHitBox;
    }
  }

  const { x, y, width, height } = firstCollisionHitBox.isEmpty()
    ? Phaser.Geom.Intersects.GetRectangleIntersection(
        rigidBody.hitbox,
        collisionReceiver
      )
    : Phaser.Geom.Intersects.GetRectangleIntersection(
        firstCollisionHitBox,
        collisionReceiver
      );

  return width >= height
    ? _detectIfTopOrBottomCollision(
        firstCollisionHitBox,
        rigidBody.hitbox,
        collisionReceiver
      )
    : _detectIfLeftOrRightCollision(
        firstCollisionHitBox,
        rigidBody.hitbox,
        collisionReceiver
      );
}

function detectIfTopOrBottomCollision(
  collisionInstigator: Phaser.Geom.Rectangle,
  collisionReceiver: Phaser.Geom.Rectangle
): ICollision {
  const collisionIntersection = Phaser.Geom.Intersects.GetRectangleIntersection(
    collisionInstigator,
    collisionReceiver
  );

  return {
    intersection: collisionIntersection,
    direction:
      collisionInstigator.top < collisionReceiver.top
        ? 'TopCollision'
        : 'BottomCollision',
  };
}

function detectIfLeftOrRightCollision(
  collisionInstigator: Phaser.Geom.Rectangle,
  collisionReceiver: Phaser.Geom.Rectangle
): ICollision {
  const collisionIntersection = Phaser.Geom.Intersects.GetRectangleIntersection(
    collisionInstigator,
    collisionReceiver
  );

  return {
    intersection: collisionIntersection,
    direction:
      collisionInstigator.centerX > collisionReceiver.centerX
        ? 'LeftCollision'
        : 'RightCollision',
  };
}

function getCollidableType(collidable: ICollidable): string {
  return collidable.collisionDetails.interface;
}

function collidableAreStackable(
  bottomCollidable: Phaser.Geom.Rectangle,
  topCollidable: Phaser.Geom.Rectangle
): boolean {
  return (
    (Math.abs(bottomCollidable.top - topCollidable.bottom) < 32 ||
      Math.abs(bottomCollidable.bottom - topCollidable.top) < 32) &&
    Math.abs(bottomCollidable.right - topCollidable.right) < 32 &&
    Math.abs(bottomCollidable.left - topCollidable.left) < 32
  );
}

function collidableAreSideBySide(
  leftCollidable: Phaser.Geom.Rectangle,
  rightCollidable: Phaser.Geom.Rectangle
): boolean {
  return (
    (Math.abs(leftCollidable.right - rightCollidable.left) < 32 ||
      Math.abs(leftCollidable.left - rightCollidable.right) < 32) &&
    Math.abs(leftCollidable.top - rightCollidable.top) < 32 &&
    Math.abs(leftCollidable.bottom - rightCollidable.bottom) < 32
  );
}

function _detectIfTopOrBottomCollision(
  firstCollision: Phaser.Geom.Rectangle,
  collisionInstigator: Phaser.Geom.Rectangle,
  collisionReceiver: Phaser.Geom.Rectangle
): ICollision {
  const collisionIntersection = Phaser.Geom.Intersects.GetRectangleIntersection(
    collisionInstigator,
    collisionReceiver
  );

  return {
    intersection: collisionIntersection,
    direction:
      firstCollision.centerY < collisionReceiver.centerY
        ? 'TopCollision'
        : 'BottomCollision',
  };
}

function _detectIfLeftOrRightCollision(
  firstCollision: Phaser.Geom.Rectangle,
  collisionInstigator: Phaser.Geom.Rectangle,
  collisionReceiver: Phaser.Geom.Rectangle
): ICollision {
  const collisionIntersection = Phaser.Geom.Intersects.GetRectangleIntersection(
    collisionInstigator,
    collisionReceiver
  );

  return {
    intersection: collisionIntersection,
    direction:
      firstCollision.centerX > collisionReceiver.centerX
        ? 'LeftCollision'
        : 'RightCollision',
  };
}

function intersect(
  rectangle1: Phaser.Geom.Rectangle,
  rectangle2: Phaser.Geom.Rectangle
): Phaser.Geom.Rectangle {
  if (rectangle1.contains(rectangle2.x, rectangle2.y)) {
    const rightSide = Math.min(
      rectangle1.x + rectangle1.width,
      rectangle2.x + rectangle2.width
    );
    const leftSide = Math.max(rectangle1.x, rectangle2.x);
    const topSide = Math.max(rectangle1.y, rectangle2.y);
    const bottomSide = Math.min(
      rectangle1.y + rectangle1.height,
      rectangle2.y + rectangle2.height
    );
    return new Phaser.Geom.Rectangle(
      leftSide,
      topSide,
      rightSide - leftSide,
      bottomSide - topSide
    );
  }

  return new Phaser.Geom.Rectangle();
}

const collisionResponders: {
  [x: string]: (
    collisionInstigator: ICollidable,
    collisionReceiver: ICollidable,
    collision: ICollision
  ) => void;
} = {
  'IPlayer,IBlock': respondToPlayerBlockCollision,
  'IPlayer,IEnemy': respondToPlayerEnemyCollision,
  'IPlayer,IItem': respondToPlayerItemCollision,
  'IPlayer,IPipe': respondToPlayerWarpPipeCollision,

  'IEnemy,IBlock': respondToEnemyBlockCollision,
  'IEnemy,IEnemy': respondToEnemyEnemyCollision,
  'IEnemy,IProjectile': respondToEnemyProjectileCollision,
  'IEnemy,IPlayer': respondToPlayerEnemyCollision,

  'IItem,IBlock': respondToItemBlockCollision,
  'IItem,IPlayer': respondToPlayerItemCollision,

  'IPlayer,ICamera': respondToPlayerCameraCollision,
  'IEnemy,ICamera': respondToEnemyCameraCollision,

  'IProjectile,IBlock': respondToProjectileBlockCollision,
  'IProjectile,IEnemy': respondToEnemyProjectileCollision,
};
