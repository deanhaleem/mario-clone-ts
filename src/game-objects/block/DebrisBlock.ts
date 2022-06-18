import { physics } from '../../utils/constants/Physics';
import { KinematicGameObject } from '../KinematicGameObject';

export class DebrisBlock extends KinematicGameObject {
  constructor(location: Phaser.Math.Vector2, impulse: Phaser.Math.Vector2) {
    super(location, physics.maxDebrisVelocity);

    this.applyImpulse(impulse);
    this.applyForce(physics.gravitationalForce);
    this.direction = impulse.x / impulse.y;
  }

  protected override get spriteName() {
    return 'Debris';
  }
}
