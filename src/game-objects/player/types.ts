import { IRigidBody } from '../../physics/types';
import { IGameObject } from '../types';
import { IPowerUpState, IActionState } from './state/types';

export interface IPlayer extends IGameObject, IRigidBody, ITransformable {
  canWarp: boolean;

  powerUpState: IPowerUpState;
  actionState: IActionState;

  stand(): void;
  jump(): void;
  walkRight(): void;
  walkLeft(): void;
  crouch(): void;
  run(): void;
  attack(): void;
  stopJumping(): void;
  stopMovingRight(): void;
  stopMovingLeft(): void;
  stopCrouching(): void;
  stopRunning(): void;
  warp(location: Phaser.Math.Vector2, velocity: Phaser.Math.Vector2): void;
  winLevel(): void;
}

export interface ITransformable {
  upgrade(): void;
  takeDamage(): void;
  decorate(): void;
  turnDead(): void;
}
