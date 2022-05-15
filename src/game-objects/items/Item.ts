import { GameObject } from '../GameObject';
import { IItem } from './types';

export abstract class Item extends GameObject implements IItem {
  protected constructor(location: Phaser.Math.Vector2) {
    super(location);
  }
}
