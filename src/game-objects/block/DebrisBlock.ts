import { GameObject } from '../GameObject';

export class DebrisBlock extends GameObject {
  //TODO: KinematicGameObject
  constructor(location: Phaser.Math.Vector2, impulse: Phaser.Math.Vector2) {
    super(location);

    // this.applyImpulse(impulse);
    // this.applyForce(Physics.gravitationalForce);
    // this.direction = impulse.x / impulse.y;
  }
}
