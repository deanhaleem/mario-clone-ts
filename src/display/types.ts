import { IDrawable } from '../graphics/types';
import { ICollidable } from '../physics/types';
import { IUpdatable } from '../types';

export interface ICamera extends ICollidable {
  location: Phaser.Math.Vector2;
  transform: Phaser.Math.Matrix4;
}

export interface ICameraController {
  update(location: number, velocity: number): void;
  setCameraLocation(location: Phaser.Math.Vector2): void;
}

export interface IHud extends IUpdatable, IDrawable {}
