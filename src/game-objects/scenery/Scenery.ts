import { GameObject } from '../GameObject';
import { IScenery } from './types';

export class Scenery extends GameObject implements IScenery {
  constructor(location: Phaser.Math.Vector2, sceneryType: string) {
    super(location);

    this.setSprite(sceneryType);
  }

  public override get collisionDetails() {
    return {
      interface: 'IScenery',
      class: this.constructor.name,
      kinematic: false,
    };
  }
}
