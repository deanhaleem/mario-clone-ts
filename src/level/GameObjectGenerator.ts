import { ILevel } from './types';
import levelFile from '../../public/assets/1-1.json';
import { Mario } from '../game-objects/player/Mario';
import { Goomba } from '../game-objects/enemy/Goomba';
import { Koopa } from '../game-objects/enemy/Koopa';
import { BrickBlock } from '../game-objects/block/BrickBlock';
import { BrickCollectionBlock } from '../game-objects/block/BrickCollectionBlock';
import { DebrisBlock } from '../game-objects/block/DebrisBlock';
import { FloorBlock } from '../game-objects/block/FloorBlock';
import { HiddenBlock } from '../game-objects/block/HiddenBlock';
import { HorizontalGreenPipe } from '../game-objects/block/HorizontalGreenPipe';
import { ItemBrickBlock } from '../game-objects/block/ItemBrickBlock';
import { LargeGreenPipeShaft } from '../game-objects/block/LargeGreenPipeShaft';
import { LargeVerticalGreenPipe } from '../game-objects/block/LargeVerticalGreenPipe';
import { MediumVerticalGreenPipe } from '../game-objects/block/MediumVerticalGreenPipe';
import { NonPowerUpQuestionBlock } from '../game-objects/block/NonPowerupQuestionBlock';
import { PowerUpQuestionBlock } from '../game-objects/block/PowerUpQuestionBlock';
import { SmallVerticalGreenPipe } from '../game-objects/block/SmallVerticalGreenPipe';
import { StairBlock } from '../game-objects/block/StairBlock';
import { UsedBlock } from '../game-objects/block/UsedBlock';
import { CastleDoor } from '../game-objects/item/CastleDoor';
import { FireFlower } from '../game-objects/item/FireFlower';
import { Flagpole } from '../game-objects/item/Flagpole';
import { GreenMushroom } from '../game-objects/item/GreenMushroom';
import { RedMushroom } from '../game-objects/item/RedMushroom';
import { NonSpinningCoin } from '../game-objects/item/NonSpinningCoin';
import { SpinningCoin } from '../game-objects/item/SpinningCoin';
import { Star } from '../game-objects/item/Star';
import { Scenery } from '../game-objects/scenery/Scenery';

export interface GameObjectRegistrar {
  Type: string;
  Namespace: string;
  Locations: { X: number; Y: number }[];
  WarpLocations?: { X: number; Y: number }[];
  Lengths?: { X: number; Y: number }[];
  ItemTypes?: string[];
}

export class GameObjectGenerator {
  private readonly level: ILevel;
  private gameObjectRegistrars: { [x: string]: GameObjectRegistrar };
  private constructors = {};

  private methods = {
    Mario: this.createSingleGameObjects,

    Goomba: this.createSingleGameObjects,
    Koopa: this.createSingleGameObjects,

    BrickBlock: this.createSingleGameObjects,
    BrickCollectionBlock: this.createCollectionGameObjects,
    DebrisBlock: this.createNonCollidableGameObjects,
    FloorBlock: this.createCollectionGameObjects,
    HiddenBlock: this.createItemContainerGameObjects,
    HorizontalGreenPipe: this.createPipeGameObject,
    ItemBrickBlock: this.createItemContainerGameObjects,
    LargeGreenPipeShaft: this.createCollectionGameObjects,
    LargeVerticalGreenPipe: this.createPipeGameObject,
    MediumVerticalGreenPipe: this.createPipeGameObject,
    NonPowerUpQuestionBlock: this.createItemContainerGameObjects,
    PowerUpQuestionBlock: this.createItemContainerGameObjects,
    SmallVerticalGreenPipe: this.createPipeGameObject,
    StairBlock: this.createCollectionGameObjects,
    UsedBlock: this.createSingleGameObjects,

    CastleDoor: this.createSingleGameObjects,

    Scenery: this.createScenery,
  };

  constructor(level: ILevel) {
    this.gameObjectRegistrars = {};
    this.level = level;

    this.constructors = {
      Mario,

      Goomba,
      Koopa,

      BrickBlock,
      BrickCollectionBlock,
      DebrisBlock,
      FloorBlock,
      HiddenBlock,
      HorizontalGreenPipe,
      ItemBrickBlock,
      LargeGreenPipeShaft,
      LargeVerticalGreenPipe,
      MediumVerticalGreenPipe,
      NonPowerUpQuestionBlock,
      PowerUpQuestionBlock,
      SmallVerticalGreenPipe,
      StairBlock,
      UsedBlock,

      CastleDoor,
      FireFlower,
      Flagpole,
      GreenMushroom,
      RedMushroom,
      NonSpinningCoin,
      SpinningCoin,
      Star,

      Scenery,
    };
  }

  public loadContent() {
    this.gameObjectRegistrars = levelFile;
  }

  public generateGameObjects() {
    Object.keys(this.gameObjectRegistrars).forEach((gameObjectType) => {
      const gameObjectRegistrar = this.gameObjectRegistrars[gameObjectType];
      if (this.methods[gameObjectType]) {
        this.methods[gameObjectType].apply(this, [
          gameObjectRegistrar,
          gameObjectType,
        ]);
      } else {
        this.createScenery(gameObjectRegistrar, gameObjectType);
      }
    });
  }

  public createSingleGameObjects(
    gameObjectRegistrar: GameObjectRegistrar,
    gameObjectType: string
  ) {
    for (let i = 0; i < gameObjectRegistrar.Locations.length; i++) {
      const gameObject = new this.constructors[gameObjectType](
        new Phaser.Math.Vector2(
          gameObjectRegistrar.Locations[i].X,
          gameObjectRegistrar.Locations[i].Y
        )
      );

      this.level.registerGameObject(gameObject);
    }
  }

  public createCollectionGameObjects(
    gameObjectRegistrar: GameObjectRegistrar,
    gameObjectType: string
  ) {
    for (let i = 0; i < gameObjectRegistrar.Locations.length; i++) {
      const gameObjectLocation = gameObjectRegistrar.Locations[i];
      const gameObject = new this.constructors[gameObjectType](
        new Phaser.Math.Vector2(gameObjectLocation.X, gameObjectLocation.Y),
        new Phaser.Math.Vector2(
          gameObjectRegistrar.Lengths?.[i].X ?? 0,
          gameObjectRegistrar.Lengths?.[i].Y ?? 0
        )
      );

      this.level.registerGameObject(gameObject);
    }
  }

  public createItemContainerGameObjects(
    gameObjectRegistrar: GameObjectRegistrar,
    gameObjectType: string
  ) {
    for (let i = 0; i < gameObjectRegistrar.Locations.length; i++) {
      const gameObjectLocation = gameObjectRegistrar.Locations[i];
      const gameObject = new this.constructors[gameObjectType](
        new Phaser.Math.Vector2(gameObjectLocation.X, gameObjectLocation.Y),
        new this.constructors[gameObjectRegistrar.ItemTypes[i]]()
      );

      this.level.registerGameObject(gameObject);
    }
  }

  public createNonCollidableGameObjects(
    gameObjectRegistrar: GameObjectRegistrar,
    gameObjectType: string
  ) {
    for (let i = 0; i < gameObjectRegistrar.Locations.length; i++) {
      const gameObjectLocation = gameObjectRegistrar.Locations[i];
      const gameObject = new this.constructors[gameObjectType](
        new Phaser.Math.Vector2(gameObjectLocation.X, gameObjectLocation.Y)
      );

      this.level.unregisterGameObject(gameObject);
    }
  }

  public createPipeGameObject(
    gameObjectRegistrar: GameObjectRegistrar,
    gameObjectType: string
  ) {
    for (let i = 0; i < gameObjectRegistrar.Locations.length; i++) {
      const gameObjectLocation = gameObjectRegistrar.Locations[i];
      const gameObject = new this.constructors[gameObjectType](
        new Phaser.Math.Vector2(gameObjectLocation.X, gameObjectLocation.Y),
        new Phaser.Math.Vector2(
          gameObjectRegistrar.WarpLocations?.[i].X,
          gameObjectRegistrar.WarpLocations?.[i].Y
        )
      );

      this.level.registerGameObject(gameObject);
    }
  }

  public createScenery(
    gameObjectRegistrar: GameObjectRegistrar,
    gameObjectType: string
  ) {
    for (let i = 0; i < gameObjectRegistrar.Locations.length; i++) {
      const gameObjectLocation = gameObjectRegistrar.Locations[i];
      const gameObject = new this.constructors['Scenery'](
        new Phaser.Math.Vector2(gameObjectLocation.X, gameObjectLocation.Y),
        gameObjectType
      );

      this.level.unregisterGameObject(gameObject);
    }
  }
}
