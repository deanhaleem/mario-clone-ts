import { GameObject } from '../GameObject';
import { IPlayer } from './types';

export abstract class Player extends GameObject implements IPlayer {
  protected constructor(location: Phaser.Math.Vector2) {
    super(location);
  }

  public jump(): void {
    this.location.add({ x: 0, y: -2 });
  }

  public walkRight(): void {
    this.location.add({ x: 2, y: 0 });
  }

  public walkLeft(): void {
    this.location.add({ x: -2, y: 0 });
  }

  public crouch(): void {
    this.location.add({ x: 0, y: 2 });
  }

  public run(): void {}
}
