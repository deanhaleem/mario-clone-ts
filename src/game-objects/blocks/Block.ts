import { GameObject } from '../GameObject';
import { IBlock } from './types';

export abstract class Block extends GameObject implements IBlock {
  protected constructor(location: Phaser.Math.Vector2) {
    super(location);
  }
}
