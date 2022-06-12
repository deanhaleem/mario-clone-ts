import { physics } from '../../utils/constants/Physics';
import { Fireball } from './Fireball';

export class ProjectileFactory {
  public static instance = new ProjectileFactory();

  private readonly projectileCreators: Record<string, typeof Fireball> = {
    fireball: Fireball,
  };

  private constructor() {}

  public createRightProjectile(
    projectileType: string,
    spawnArea: Phaser.Geom.Rectangle
  ): void {
    // Game1.instance.registerGameObject(
    //   new this.projectileCreators[projectileType](
    //     new Phaser.Math.Vector2(
    //       spawnArea.right,
    //       spawnArea.top + spawnArea.height / 2
    //     ),
    //     physics.rightProjectileVelocity
    //   )
    // );
    // SoundManager.instance.playSoundEffect('createRightProjectile');
  }

  public createLeftProjectile(
    projectileType: string,
    spawnArea: Phaser.Geom.Rectangle
  ): void {
    // Game1.instance.registerGameObject(
    //   new this.projectileCreators[projectileType](
    //     new Phaser.Math.Vector2(
    //       spawnArea.left,
    //       spawnArea.top + spawnArea.height / 2
    //     ),
    //     physics.leftProjectileVelocity
    //   )
    // );
    // SoundManager.instance.playSoundEffect('createRightProjectile');
  }
}
