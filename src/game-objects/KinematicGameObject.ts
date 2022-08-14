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

  protected constructor(
    location: Phaser.Math.Vector2,
    maxVelocity: Phaser.Math.Vector2
  ) {
    super(location);

    this.maxVelocity = maxVelocity;
    this._direction = Directions.Right;
    this.velocity = Phaser.Math.Vector2.ZERO;
    this.acceleration = Phaser.Math.Vector2.ZERO;
  }

  public override update(time: number, delta: number): void {
    // console.log(delta * 1000);
    this.velocity.add(
      new Phaser.Math.Vector2(
        this.acceleration.x * Math.fround(delta / 1000 - physics.deltaTime),
        this.acceleration.y * Math.fround(delta / 1000 - physics.deltaTime)
      )
    );

    this.location.add(this.velocity);

    // if (this.constructor.name === 'Mario') console.log(this.location);

    super.update(time, delta);
  }

  public applyImpulse(impulse: Phaser.Math.Vector2): void {
    this.velocity.add(impulse);
    if (this.constructor.name === 'Mario') {
      console.log('apply impulse', Date.now().toLocaleString('en-US'));
      console.log(impulse, Date.now().toLocaleString('en-US'));
    }
  }

  public applyForce(force: Phaser.Math.Vector2): void {
    this.acceleration = force;
    if (this.constructor.name === 'Mario') {
      console.log('apply force', Date.now().toLocaleString('en-US'));
      console.log(force, Date.now().toLocaleString('en-US'));
    }
  }

  public cutXVelocity(): void {
    this.velocity.x = 0;
    this.acceleration.x = 0;
  }

  public cutYVelocity(): void {
    this.velocity.y = 0;
    this.acceleration.y = 0;
    // console.log(this.velocity, Date.now().toLocaleString('en-US'));
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
    // if (this.constructor.name === 'Mario') console.log(velocity);

    if (this._velocity.x < -this.maxVelocity.x) {
      this._velocity.x = -this.maxVelocity.x;
    } else if (this._velocity.x > this.maxVelocity.x) {
      this._velocity.x = this.maxVelocity.x;
    }

    if (this._velocity.y > this.maxVelocity.y) {
      if (this.constructor.name === 'Mario') console.log(this._velocity.y);
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
