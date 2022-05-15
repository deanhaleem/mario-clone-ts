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
