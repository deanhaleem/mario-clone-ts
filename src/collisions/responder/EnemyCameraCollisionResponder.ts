import { ICommand } from '../../input/types';
import { ICollidable } from '../../physics/types';
import { Constructor } from '../../types';
import { RightEnemyCameraCollisionCommand } from '../command/enemy/RightEnemyCameraCollisionCommand';
import { ICollision, ICollisionResponder } from '../types';

export class EnemyCameraCollisionResponder implements ICollisionResponder {
  private readonly enemyCameraCollisionCommands: {
    [key: string]: Constructor<ICommand>;
  };

  public respondToCollision(
    enemy: ICollidable,
    camera: ICollidable,
    collision: ICollision
  ): void {
    if (this.enemyCameraCollisionCommands[`${collision.direction}`]) {
      new this.enemyCameraCollisionCommands[`${collision.direction}`](
        enemy
      ).execute();
    }
  }

  constructor() {
    this.enemyCameraCollisionCommands = {
      RightCollision: RightEnemyCameraCollisionCommand,
    };
  }
}
