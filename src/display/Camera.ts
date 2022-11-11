import { ICamera } from './types';

export class Camera implements ICamera {
  private readonly screenSize: Phaser.Math.Vector2;

  public location: Phaser.Math.Vector2;

  constructor(location: Phaser.Math.Vector2, screenSize: Phaser.Math.Vector2) {
    this.location = location;
    this.screenSize = screenSize;
  }

  public get transform() {
    return new Phaser.Math.Matrix4().translate(
      new Phaser.Math.Vector3(-this.location.x, -this.location.y, 0)
    );
  }

  public get hitbox() {
    return new Phaser.Geom.Rectangle(
      Math.round(this.location.x),
      Math.round(this.location.y),
      this.screenSize.x,
      this.screenSize.y
    );
  }

  public get collisionDetails() {
    return {
      interface: 'ICamera',
      class: this.constructor.name,
      kinematic: false,
    };
  }
}
