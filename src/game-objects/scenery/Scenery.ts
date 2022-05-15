import { GameObject } from '../GameObject';
import { IScenery } from './types';

export abstract class Scenery extends GameObject implements IScenery {
  protected constructor(location: Phaser.Math.Vector2) {
    super(location);
  }
}
