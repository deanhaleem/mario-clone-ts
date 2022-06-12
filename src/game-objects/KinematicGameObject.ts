import { Directions, IRigidBody } from '../physics/types';
import { offsets } from '../utils/constants/Offsets';
import { physics } from '../utils/constants/Physics';
import { GameObject } from './GameObject';

export abstract class KinematicGameObject
  extends GameObject
  implements IRigidBody
{
  private _velocity: Phaser.Math.Vector2;
  private _acceleration: Phaser.Math.Vector2;
  private maxVelocity: Phaser.Math.Vector2;
  private _direction: Directions;

  constructor(location: Phaser.Math.Vector2, maxVelocity: Phaser.Math.Vector2) {
    super(location);

    this.maxVelocity = maxVelocity;
    this.direction = Directions.Right;
    this.velocity = new Phaser.Math.Vector2();
    this.acceleration = new Phaser.Math.Vector2();
  }

  public override update(time: number, delta: number): void {
    // TODO: can I override the += operator?
    // TODO: test the set accessor still applies with this
    this.velocity = this.velocity.add(
      this.acceleration.multiply(
        new Phaser.Math.Vector2(delta - physics.deltaTime)
      )
    );
    // this.velocity = new Phaser.Math.Vector2(
    //   this.velocity.x + this.acceleration.x * (delta - physics.deltaTime),
    //   this.velocity.y + this.acceleration.y * (delta - physics.deltaTime)
    // );

    this.location = new Phaser.Math.Vector2(
      this.location.x + this.velocity.x,
      this.location.y + this.velocity.y
    );

    super.update(time, delta);
  }

  public applyImpulse(impulse: Phaser.Math.Vector2): void {
    this.velocity = new Phaser.Math.Vector2(
      this.velocity.x + impulse.x,
      this.velocity.y + impulse.y
    );
  }

  public applyForce(force: Phaser.Math.Vector2): void {
    this.acceleration = new Phaser.Math.Vector2(
      this.acceleration.x + force.x,
      this.acceleration.y + force.y
    );
  }

  public cutXVelocity(): void {
    this.velocity.x = 0;
    this.acceleration.x = 0;
  }

  public cutYVelocity(): void {
    this.velocity.y = 0;
    this.acceleration.y = 0;
  }

  public land(): void {
    this.cutYVelocity();
  }

  public fall(): void {
    this.velocity.y = 3;
  }

  public changeDirection(): void {
    this.velocity.x *= -1;
    this.acceleration.x *= -1;
    this.direction = this.velocity.x / Math.abs(this.velocity.x);
  }

  public setMaxVelocity(velocity: Phaser.Math.Vector2): void {
    this.maxVelocity = velocity;
  }

  public get extendedHitbox() {
    return new Phaser.Geom.Rectangle(
      super.hitbox.x,
      super.hitbox.y,
      super.hitbox.width,
      offsets.extendedHeight + super.hitbox.height
    );
  }

  public get direction(): Directions {
    return this._direction;
  }

  public set direction(direction: Directions) {
    this._direction = direction;
    if (this.spriteName) {
      super.setSprite(this.spriteName);
    }
  }

  public get velocity(): Phaser.Math.Vector2 {
    return this._velocity;
  }

  public set velocity(velocity: Phaser.Math.Vector2) {
    this._velocity = velocity;

    if (this._velocity.x < -this.maxVelocity.x) {
      this._velocity.x = -this.maxVelocity.x;
    } else if (this._velocity.x > -this.maxVelocity.x) {
      this._velocity.x = this.maxVelocity.x;
    }

    if (this._velocity.y > this.maxVelocity.y) {
      this._velocity.y = this.maxVelocity.y;
    }
  }

  public get acceleration() {
    return this._acceleration;
  }

  public set acceleration(acceleration: Phaser.Math.Vector2) {
    this._acceleration = acceleration;
  }
}
