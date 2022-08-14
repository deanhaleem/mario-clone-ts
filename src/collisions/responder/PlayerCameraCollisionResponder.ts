import { ICommand } from '../../input/types';
import { ICollidable } from '../../physics/types';
import { Constructor } from '../../types';
import { LeftPlayerCameraCollisionCommand } from '../command/player/LeftPlayerCameraCollisionCommand';
import { RightPlayerCameraCollisionCommand } from '../command/player/RightPlayerCameraCollisionCommand';
import { ICollision, ICollisionResponder } from '../types';

export class PlayerCameraCollisionResponder implements ICollisionResponder {
  private readonly playerCameraCollisionCommands: {
    [key: string]: Constructor<ICommand>;
  };

  public respondToCollision(
    player: ICollidable,
    camera: ICollidable,
    collision: ICollision
  ): void {
    if (this.playerCameraCollisionCommands[`${collision.direction}`]) {
      new this.playerCameraCollisionCommands[`${collision.direction}`](
        player,
        collision
      ).execute();
    }
  }

  constructor() {
    this.playerCameraCollisionCommands = {
      LeftCollision: LeftPlayerCameraCollisionCommand,
      RightCollision: RightPlayerCameraCollisionCommand,
    };
  }
}
