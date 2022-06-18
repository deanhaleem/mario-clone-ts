import { KinematicGameObject } from '../KinematicGameObject';
import { IPlayer } from './types';
import { IActionState, IPowerUpState } from './state/types';
import { Directions } from '../../physics/types';
import { physics } from '../../utils/constants/Physics';
import { locations } from '../../utils/constants/Locations';
import { SmallPowerUpState } from './state/SmallPowerUpState';

export abstract class Player extends KinematicGameObject implements IPlayer {
  private _playerActionState: IActionState;
  private _canWarp: boolean;

  public powerUpState: IPowerUpState;

  protected constructor(location: Phaser.Math.Vector2) {
    super(location, physics.maxPlayerVelocity);

    this.canWarp = false;
  }

  public override update(time: number, delta: number): void {
    if (this.location.y > locations.worldBoundary.y) {
      // || StatManager.instance.time <= 0
      this.powerUpState.turnDead();
    }
    this.powerUpState.update(time, delta);
    this.actionState.update(time, delta);

    super.update(time, delta);
  }

  public stand(): void {
    this.actionState.stand();
  }

  public jump(): void {
    this.actionState.jump();
  }

  public walkRight(): void {
    this.actionState.walkRight();
  }

  public walkLeft(): void {
    this.actionState.walkLeft();
  }

  public crouch(): void {
    if (typeof this.powerUpState !== typeof SmallPowerUpState) {
      this.actionState.crouch();
    }
    this.canWarp = true;
  }

  public run(): void {
    this.actionState.run();
  }

  public fall(): void {
    this.actionState.fall();
  }

  public land(): void {
    this.actionState.land();
  }

  public attack(): void {
    this.powerUpState.attack();
  }

  public stopRunning(): void {
    this.actionState.stopRunning();
  }

  public stopJumping(): void {
    this.actionState.stopJumping();
  }

  public stopMovingRight(): void {
    this.actionState.stopMovingRight();
  }

  public stopMovingLeft(): void {
    this.actionState.stopMovingLeft();
  }

  public stopCrouching(): void {
    this.actionState.stopCrouching();
  }

  public takeDamage(): void {
    this.powerUpState.takeDamage();
  }

  public upgrade(): void {
    this.powerUpState.upgrade();
  }

  public decorate(): void {
    this.powerUpState.decorate();
    this.actionState.decorate();
  }

  public turnDead(): void {
    this.powerUpState.turnDead();
  }

  public warp(
    location: Phaser.Math.Vector2,
    velocity: Phaser.Math.Vector2
  ): void {
    this.actionState.warp(location, velocity);
  }

  public winLevel(): void {
    this.actionState.winLevel();
  }

  protected override get spriteName() {
    return `${this.powerUpState.spriteName}${Directions[this.direction]}${
      this._playerActionState.spriteName
    }${this.constructor.name}`;
  }

  public get actionState() {
    return this._playerActionState;
  }

  public set actionState(playerActionState: IActionState) {
    this._playerActionState = playerActionState;
    if (this.powerUpState && this.actionState) {
      this.setSprite(this.spriteName);
    }
  }

  public get canWarp() {
    return this._canWarp;
  }

  public set canWarp(canWarp: boolean) {
    this._canWarp = canWarp;
  }
}
