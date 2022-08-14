import { ICommand } from '../../input/types';
import { ICollidable } from '../../physics/types';
import { Constructor } from '../../types';
import { PushLeftExplodeProjectileCommand } from '../command/projectile/PushLeftExplodeProjectileCommand';
import { PushProjectileDownCommand } from '../command/projectile/PushProjectileDownCommand';
import { PushProjectileUpCommand } from '../command/projectile/PushProjectileUpCommand';
import { PushRightExplodeProjectileCommand } from '../command/projectile/PushRightExplodeProjectileCollision';
import { ICollision, ICollisionResponder } from '../types';

export class ProjectileBlockCollisionResponder implements ICollisionResponder {
  private readonly projectileBlockCollisionCommands: {
    [key: string]: Constructor<ICommand>;
  };

  public respondToCollision(
    projectile: ICollidable,
    block: ICollidable,
    collision: ICollision
  ): void {
    if (this.projectileBlockCollisionCommands[`${collision.direction}`]) {
      new this.projectileBlockCollisionCommands[`${collision.direction}`](
        projectile,
        collision
      ).execute();
    }
  }

  constructor() {
    this.projectileBlockCollisionCommands = {
      TopCollision: PushProjectileUpCommand,
      BottomCollision: PushProjectileDownCommand,
      LeftCollision: PushRightExplodeProjectileCommand,
      RightCollision: PushLeftExplodeProjectileCommand,
    };
  }
}
