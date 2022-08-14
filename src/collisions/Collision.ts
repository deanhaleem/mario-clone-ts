import { ICollision } from './types';

export class Collision implements ICollision {
  public intersection: Phaser.Geom.Rectangle;
  public direction: string;

  constructor(collisionIntersection: Phaser.Geom.Rectangle, direction: string) {
    this.intersection = collisionIntersection;
    this.direction = direction;
  }
}
