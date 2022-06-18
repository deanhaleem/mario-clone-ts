import { IUpdatable } from '../../../types';
import { ITransformable } from '../types';

export interface IActionState extends IUpdatable {
  spriteName: string;
  stand(): void;
  jump(): void;
  walkRight(): void;
  walkLeft(): void;
  crouch(): void;
  fall(): void;
  land(): void;
  run(): void;
  attack(projectileType: string): void;
  stopJumping(): void;
  stopMovingRight(): void;
  stopMovingLeft(): void;
  stopCrouching(): void;
  stopRunning(): void;
  decorate(): void;
  upgrade(): void;
  downgrade(): void;
  warp(location: Phaser.Math.Vector2, velocity: Phaser.Math.Vector2): void;
  winLevel(): void;
}

export interface IPowerUpState extends IUpdatable, ITransformable {
  spriteName: string;

  attack(): void;
}
