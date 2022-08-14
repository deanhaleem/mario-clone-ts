import { ICollidable, IRigidBody } from '../physics/types';
import { Collision } from './Collision';
import { ICollision } from './types';

export function detectCollision(
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

export function detectIfTopOrBottomCollision(
  collisionInstigator: Phaser.Geom.Rectangle,
  collisionReceiver: Phaser.Geom.Rectangle
): ICollision {
  const collisionIntersection = Phaser.Geom.Intersects.GetRectangleIntersection(
    collisionInstigator,
    collisionReceiver
  );

  return collisionInstigator.top < collisionReceiver.top
    ? new Collision(collisionIntersection, 'TopCollision')
    : new Collision(collisionIntersection, 'BottomCollision');
}

export function detectIfLeftOrRightCollision(
  collisionInstigator: Phaser.Geom.Rectangle,
  collisionReceiver: Phaser.Geom.Rectangle
): ICollision {
  const collisionIntersection = Phaser.Geom.Intersects.GetRectangleIntersection(
    collisionInstigator,
    collisionReceiver
  );

  return collisionInstigator.centerX > collisionReceiver.centerX
    ? new Collision(collisionIntersection, 'LeftCollision')
    : new Collision(collisionIntersection, 'RightCollision');
}

export function getCollidableType(collidable: ICollidable): string {
  return collidable.collisionDetails.interface;
}

export function collidableAreStackable(
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

export function collidableAreSideBySide(
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

  return firstCollision.centerY < collisionReceiver.centerY
    ? new Collision(collisionIntersection, 'TopCollision')
    : new Collision(collisionIntersection, 'BottomCollision');
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

  return firstCollision.centerX > collisionReceiver.centerX
    ? new Collision(collisionIntersection, 'LeftCollision')
    : new Collision(collisionIntersection, 'RightCollision');
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
