import { ICamera } from '../display/types';
import { IPipe } from '../game-objects/block/types';
import { Mario } from '../game-objects/player/Mario';
import { IPlayer } from '../game-objects/player/types';
import { IGameObject } from '../game-objects/types';
import { IRigidBody } from '../physics/types';
import { utilities } from '../utils/constants/Utilities';
import { EnemyBlockCollisionResponder } from './responder/EnemyBlockCollisionResponder';
import { EnemyCameraCollisionResponder } from './responder/EnemyCameraCollisionResponder';
import { EnemyEnemyCollisionResponder } from './responder/EnemyEnemyCollisionResponder';
import { EnemyProjectileCollisionResponder } from './responder/EnemyProjectileCollisionResponder';
import { PlayerBlockCollisionResponder } from './responder/PlayerBlockCollisionResponder';
import { PlayerCameraCollisionResponder } from './responder/PlayerCameraCollisionResponder';
import { PlayerEnemyCollisionResponder } from './responder/PlayerEnemyCollisionResponder';
import { PlayerItemCollisionResponder } from './responder/PlayerItemCollisionResponder';
import { PlayerWarpPipeCollisionResponder } from './responder/PlayerWarpPipeCollisionResponder';
import { ProjectileBlockCollisionResponder } from './responder/ProjectileBlockCollisionResponder';
import { ICollisionManager, ICollisionResponder } from './types';

export class CollisionSecretary {
  private readonly collisionManager: ICollisionManager;
  private movingGameObjects: IRigidBody[] = [];
  private stationaryGameObjects: IGameObject[] = [];

  constructor(collisionManager: ICollisionManager) {
    this.collisionManager = collisionManager;
  }

  public static loadCollisionResponders(): {
    [x: string]: ICollisionResponder;
  } {
    return {
      'IPlayer,IBlock': new PlayerBlockCollisionResponder(),
      'IPlayer,IEnemy': new PlayerEnemyCollisionResponder(),
      'IPlayer,IItem': new PlayerItemCollisionResponder(),
      'IPlayer,IPipe': new PlayerWarpPipeCollisionResponder(),

      'IEnemy,IBlock': new EnemyBlockCollisionResponder(),
      'IEnemy,IEnemy': new EnemyEnemyCollisionResponder(),
      'IEnemy,IProjectile': new EnemyProjectileCollisionResponder(),
      'IEnemy,IPlayer': new PlayerEnemyCollisionResponder(),

      'IItem,IBlock': new EnemyBlockCollisionResponder(),
      'IItem,IPlayer': new PlayerItemCollisionResponder(),

      'IPlayer,ICamera': new PlayerCameraCollisionResponder(),
      'IEnemy,ICamera': new EnemyCameraCollisionResponder(),

      'IProjectile,IBlock': new ProjectileBlockCollisionResponder(),
      'IProjectile,IEnemy': new EnemyProjectileCollisionResponder(),
    };
  }

  public schedulePotentialCollisions(gameObjects: IGameObject[]) {
    this.movingGameObjects = [];
    this.stationaryGameObjects = [];

    gameObjects.forEach((gameObject) => {
      if (gameObject.collisionDetails.kinematic) {
        this.movingGameObjects.push(gameObject as unknown as IRigidBody);
      } else {
        this.stationaryGameObjects.push(gameObject);
      }
    });
  }

  public manageCollisions(camera: ICamera) {
    for (let i = 0; i < this.movingGameObjects.length; i++) {
      for (let j = i + 1; j < this.movingGameObjects.length; j++) {
        if (
          this.movingGameObjects[i].hitbox.contains(
            this.movingGameObjects[j].hitbox.x,
            this.movingGameObjects[j].hitbox.y
          )
        ) {
          this.collisionManager.manageCollisions(
            this.movingGameObjects[i],
            this.movingGameObjects[j]
          );
        }
      }

      const blocksIntersecting: IGameObject[] = [];
      const blocksOnTopOf: IGameObject[] = [];
      this.stationaryGameObjects.forEach((stationaryGameObject) => {
        if (
          !Phaser.Geom.Intersects.GetRectangleIntersection(
            this.movingGameObjects[i].hitbox,
            stationaryGameObject.hitbox
          ).isEmpty()
        ) {
          blocksIntersecting.push(stationaryGameObject);
        }

        if (
          !Phaser.Geom.Intersects.GetRectangleIntersection(
            this.movingGameObjects[i].extendedHitbox,
            stationaryGameObject.hitbox
          ).isEmpty()
        ) {
          blocksOnTopOf.push(stationaryGameObject);
        }
      });

      if (this.movingGameObjects[i].collisionDetails.interface === 'IPlayer') {
        blocksIntersecting.forEach((gameObject) => {
          if (gameObject.collisionDetails.interface === 'IPipe') {
            this.collisionManager.managePlayerPipeCollisions(
              this.movingGameObjects[i] as IPlayer,
              gameObject as IPipe
            );
          }
        });

        blocksOnTopOf.forEach((gameObject) => {
          if (gameObject.collisionDetails.interface === 'IPipe') {
            this.collisionManager.managePlayerPipeCollisions(
              this.movingGameObjects[i] as IPlayer,
              gameObject as IPipe
            );
          }
        });
      }

      if (blocksIntersecting.length === utilities.maxIntersectingBlocks) {
        this.collisionManager.manageBlockCollisions(
          this.movingGameObjects[i],
          blocksIntersecting
        );
      } else if (
        blocksIntersecting.length === utilities.normalIntersectingBlocks
      ) {
        this.collisionManager.manageCollisions(
          this.movingGameObjects[i],
          blocksIntersecting[0] as unknown as IRigidBody
        );
      }

      if (blocksOnTopOf.length === 0) {
        this.movingGameObjects[i].fall();
      }

      if (
        this.movingGameObjects[i].hitbox.contains(
          camera.hitbox.x,
          camera.hitbox.y
        )
      ) {
        this.collisionManager.manageCameraCollisions(
          this.movingGameObjects[i],
          camera
        );
      }
    }
  }
}
