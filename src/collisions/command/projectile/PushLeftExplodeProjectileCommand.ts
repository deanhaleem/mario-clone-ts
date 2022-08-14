import { IProjectile } from '../../../game-objects/projectile/types';
import { Command } from '../../../input/commands/Command';
import { ProjectileBlockCollisionHandler } from '../../handler/ProjectileBlockCollisionHandler';
import { ICollision } from '../../types';

export class PushLeftExplodeProjectileCommand extends Command<ProjectileBlockCollisionHandler> {
  constructor(projectile: IProjectile, collision: ICollision) {
    super(new ProjectileBlockCollisionHandler(projectile, collision));
  }

  public override execute(): void {
    this.receiver.handleRightProjectileBlockCollision();
  }
}
