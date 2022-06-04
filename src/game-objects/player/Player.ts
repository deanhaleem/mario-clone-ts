import { GameObject } from '../GameObject';
import { IPlayer } from './types';
import { IActionState, IPowerUpState } from './state/types';

export abstract class Player extends GameObject implements IPlayer {
  private _playerActionState: IActionState;

  public powerUpState: IPowerUpState;

  protected constructor(location: Phaser.Math.Vector2) {
    super(location);
  }

  public jump(): void {
    this._playerActionState.jump();
  }

  public walkRight(): void {
    this._playerActionState.walkRight();
  }

  public walkLeft(): void {
    this._playerActionState.walkLeft();
  }

  public crouch(): void {
    if (!(this.powerUpState.spriteName === 'Small')) {
      this._playerActionState.crouch();
    }
  }

  public run(): void {}

  public stopJumping(): void {
    this._playerActionState.stopJumping();
  }

  public stopMovingRight(): void {
    this._playerActionState.stopMovingRight();
  }

  public stopMovingLeft(): void {
    this._playerActionState.stopMovingLeft();
  }

  public stopCrouching(): void {
    this._playerActionState.stopCrouching();
  }

  public get actionState() {
    return this._playerActionState;
  }

  public set actionState(playerActionState: IActionState) {
    this._playerActionState = playerActionState;
    // TODO: Implement direction
    this.setSprite(
      `${this.powerUpState.spriteName}Left${this._playerActionState.spriteName}${this.spriteName}`
    );
  }
}
