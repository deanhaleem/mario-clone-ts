import { IPlayer } from '../../game-objects/player/types';
import { ICollision } from '../types';

export class PlayerCameraCollisionHandler {
  private readonly player: IPlayer;
  private readonly collision: ICollision;

  constructor(player: IPlayer, collision: ICollision) {
    this.player = player;
    this.collision = collision;
  }

  public handleLeftPlayerCameraCollision() {
    this.player.location.add({
      x: this.collision.intersection.width,
      y: 0,
    });
    this.player.cutXVelocity();
  }

  public handleRightPlayerCameraCollision() {
    this.player.location.subtract({
      x: this.collision.intersection.width,
      y: 0,
    });
    this.player.cutXVelocity();
  }
}
