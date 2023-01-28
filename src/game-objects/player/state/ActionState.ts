import { Directions } from '../../../physics/types';
import { ProjectileFactory } from '../../projectile/ProjectileFactory';
import { IPlayer } from '../types';
import { DowngradingActionState } from './DowngradingActionState';
import { IActionState } from './types';
import { UpgradingActionState } from './UpgradingActionState';
import { VictoryActionState } from './VictoryActionState';
import { WarpingActionState } from './WarpingActionState';

export abstract class ActionState implements IActionState {
  protected player: IPlayer;

  public abstract spriteName: string;

  protected constructor(player: IPlayer) {
    this.player = player;
  }

  public decorate(): void {
    // this.player = Game1.instance.player;
  }

  public upgrade(): void {
    //this.player.actionState = new UpgradingActionState(this.player);
  }

  public downgrade(): void {
    //this.player.actionState = new DowngradingActionState(this.player);
  }

  public winLevel(): void {
    //this.player.actionState = new VictoryActionState(this.player);
  }

  public warp(
    location: Phaser.Math.Vector2,
    velocity: Phaser.Math.Vector2
  ): void {
    // this.player.actionState = new WarpingActionState(
    //   this.player,
    //   this.player.location,
    //   velocity
    // );
  }

  public attack(projectileType: string): void {
    if (this.player.direction === Directions.Left) {
      ProjectileFactory.instance.createLeftProjectile(
        projectileType,
        this.player.hitbox
      );
    } else {
      ProjectileFactory.instance.createRightProjectile(
        projectileType,
        this.player.hitbox
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(time: number, delta: number): void {}
  public stand(): void {}
  public jump(): void {}
  public walkRight(): void {}
  public walkLeft(): void {}
  public crouch(): void {}
  public run(): void {}
  public stopJumping(): void {}
  public stopMovingRight(): void {}
  public stopMovingLeft(): void {}
  public stopCrouching(): void {}
  public stopRunning(): void {}
  public fall(): void {}
  public land(): void {}
}
