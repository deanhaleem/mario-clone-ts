import { IPlayer } from '../game-objects/player/types';
import { IGameObject } from '../game-objects/types';
import { locations } from '../utils/constants/Locations';
import { offsets } from '../utils/constants/Offsets';
import { LevelGenerator } from './LevelGenerator';
import { ILevel, ILevelGenerator } from './types';

export class Level implements ILevel {
  private readonly levelGenerator: ILevelGenerator;
  private nonCollidableGameObjects: IGameObject[];
  private gameObjects: IGameObject[];

  public name: string;

  constructor() {
    this.nonCollidableGameObjects = [];
    this.gameObjects = [];
    this.levelGenerator = new LevelGenerator(this);
  }

  public loadContent(): void {
    this.levelGenerator.loadContent();

    this.name = '1-1'; // TODO: Don't hardcode
  }

  public update(time: number, delta: number): void {
    for (let i = 0; i < this.gameObjects.length; i++) {
      this.gameObjects[i].update(time, delta);
    }

    for (let i = 0; i < this.nonCollidableGameObjects.length; i++) {
      this.nonCollidableGameObjects[i].update(time, delta);
    }
  }

  public draw(renderTexture: Phaser.GameObjects.RenderTexture): void {
    for (let i = 0; i < this.gameObjects.length; i++) {
      this.gameObjects[i].draw(renderTexture);
    }

    for (let i = 0; i < this.nonCollidableGameObjects.length; i++) {
      this.nonCollidableGameObjects[i].draw(renderTexture);
    }
  }

  public getObjectsOnScreen(levelBounds: Phaser.Geom.Rectangle): IGameObject[] {
    const objectsOnScreen: IGameObject[] = [];
    this.gameObjects.forEach((gameObject) => {
      if (
        gameObject.hitbox.right > levelBounds.x - locations.worldBoundary.x &&
        gameObject.hitbox.x < levelBounds.right + locations.worldBoundary.x
      ) {
        objectsOnScreen.push(gameObject);
      }
    });
    return objectsOnScreen;
  }

  public disposeOfGameObject(gameObject: IGameObject): void {
    if (this.gameObjects.includes(gameObject)) {
      this.gameObjects = this.gameObjects.splice(
        this.gameObjects.indexOf(gameObject),
        1
      );
    } else {
      this.nonCollidableGameObjects = this.nonCollidableGameObjects.splice(
        this.nonCollidableGameObjects.indexOf(gameObject),
        1
      );
    }
  }

  public registerGameObject(gameObject: IGameObject): void {
    if (this.nonCollidableGameObjects.includes(gameObject)) {
      this.nonCollidableGameObjects = this.nonCollidableGameObjects.splice(
        this.nonCollidableGameObjects.indexOf(gameObject),
        1
      );
    }
    this.gameObjects.push(gameObject);
  }

  public unregisterGameObject(gameObject: IGameObject): void {
    if (this.gameObjects.includes(gameObject)) {
      this.gameObjects = this.gameObjects.splice(
        this.gameObjects.indexOf(gameObject),
        1
      );
    }
    this.nonCollidableGameObjects.push(gameObject);
  }

  public cleanUp(levelBounds: Phaser.Geom.Rectangle): void {
    for (let i = 0; i < this.gameObjects.length; i++) {
      if (
        this.gameObjects[i].hitbox.right <
          levelBounds.left - offsets.outOfLevel ||
        this.gameObjects[i].hitbox.top > levelBounds.bottom + offsets.outOfLevel
      ) {
        this.gameObjects = this.gameObjects.splice(i, 1);
      }
    }

    for (let i = 0; i < this.nonCollidableGameObjects.length; i++) {
      if (
        this.nonCollidableGameObjects[i].hitbox.right <
          levelBounds.left - offsets.outOfLevel ||
        this.nonCollidableGameObjects[i].hitbox.top >
          levelBounds.bottom + offsets.outOfLevel
      ) {
        this.nonCollidableGameObjects = this.nonCollidableGameObjects.splice(
          i,
          1
        );
      }
    }
  }

  public reset(): void {
    this.gameObjects = [];
    this.nonCollidableGameObjects = [];
    this.levelGenerator.generateLevel();
  }

  public get player() {
    const gameObject = this.gameObjects.find(
      (gameObject) => gameObject.collisionDetails.interface === 'IPlayer'
    );

    if (gameObject) return gameObject as IPlayer;

    return this.nonCollidableGameObjects.find(
      (gameObject) => gameObject.collisionDetails.interface === 'IPlayer'
    ) as IPlayer;
  }

  public set player(player: IPlayer) {
    let gameObject = this.gameObjects.find(
      (gameObject) => gameObject.collisionDetails.interface === 'IPlayer'
    );

    if (gameObject) {
      this.gameObjects[this.gameObjects.indexOf(gameObject)] = player;
    }

    gameObject = this.nonCollidableGameObjects.find(
      (gameObject) => gameObject.collisionDetails.interface === 'IPlayer'
    );

    if (gameObject) {
      this.nonCollidableGameObjects[
        this.nonCollidableGameObjects.indexOf(gameObject)
      ] = player;
    }
  }
}
