export interface ICollidable {
  hitbox: Phaser.Geom.Rectangle;
}

export interface IRigidBody extends ICollidable {
  extendedHitbox: Phaser.Geom.Rectangle;
  velocity: Phaser.Math.Vector2;
  acceleration: Phaser.Math.Vector2;
  direction: Directions;

  applyImpulse(impulse: Phaser.Math.Vector2): void;
  applyForce(force: Phaser.Math.Vector2): void;
  cutXVelocity(): void;
  cutYVelocity(): void;
  fall(): void;
  land(): void;
  changeDirection(): void;
  setMaxVelocity(velocity: Phaser.Math.Vector2): void;
}

export enum Directions {
  Left = -1,
  Right = 1,
}
