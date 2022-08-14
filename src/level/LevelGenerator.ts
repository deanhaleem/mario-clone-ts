import { GameObjectRegistrar, ILevel } from './types';
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
import { Constructor } from '../types';
import { IGameObject } from '../game-objects/types';

const constructors: { [key: string]: Constructor<IGameObject> } = {
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

const methods: {
  [key: string]: (
    gameObjectRegistrar: GameObjectRegistrar,
    gameObjectType: string,
    level: ILevel
  ) => void;
} = {
  Mario: createSingleGameObjects,

  Goomba: createSingleGameObjects,
  Koopa: createSingleGameObjects,

  BrickBlock: createSingleGameObjects,
  BrickCollectionBlock: createCollectionGameObjects,
  DebrisBlock: createNonCollidableGameObjects,
  FloorBlock: createCollectionGameObjects,
  HiddenBlock: createItemContainerGameObjects,
  HorizontalGreenPipe: createPipeGameObject,
  ItemBrickBlock: createItemContainerGameObjects,
  LargeGreenPipeShaft: createCollectionGameObjects,
  LargeVerticalGreenPipe: createPipeGameObject,
  MediumVerticalGreenPipe: createPipeGameObject,
  NonPowerUpQuestionBlock: createItemContainerGameObjects,
  PowerUpQuestionBlock: createItemContainerGameObjects,
  SmallVerticalGreenPipe: createPipeGameObject,
  StairBlock: createCollectionGameObjects,
  UsedBlock: createSingleGameObjects,

  CastleDoor: createSingleGameObjects,

  Scenery: createScenery,
};

export function generateGameObjects(
  gameObjectRegistrars: {
    [x: string]: GameObjectRegistrar;
  },
  level: ILevel
) {
  Object.keys(gameObjectRegistrars).forEach((gameObjectType) => {
    const gameObjectRegistrar = gameObjectRegistrars[gameObjectType];
    if (methods[gameObjectType]) {
      methods[gameObjectType](gameObjectRegistrar, gameObjectType, level);
    } else {
      createScenery(gameObjectRegistrar, gameObjectType, level);
    }
  });
}

function createSingleGameObjects(
  gameObjectRegistrar: GameObjectRegistrar,
  gameObjectType: string,
  level: ILevel
) {
  for (let i = 0; i < gameObjectRegistrar.Locations.length; i++) {
    const gameObject = new constructors[gameObjectType](
      new Phaser.Math.Vector2(
        gameObjectRegistrar.Locations[i].X,
        gameObjectRegistrar.Locations[i].Y
      )
    );

    level.registerGameObject(gameObject);
  }
}

function createCollectionGameObjects(
  gameObjectRegistrar: GameObjectRegistrar,
  gameObjectType: string,
  level: ILevel
) {
  for (let i = 0; i < gameObjectRegistrar.Locations.length; i++) {
    const gameObjectLocation = gameObjectRegistrar.Locations[i];
    const gameObject = new constructors[gameObjectType](
      new Phaser.Math.Vector2(gameObjectLocation.X, gameObjectLocation.Y),
      new Phaser.Math.Vector2(
        gameObjectRegistrar.Lengths?.[i].X ?? 0,
        gameObjectRegistrar.Lengths?.[i].Y ?? 0
      )
    );

    level.registerGameObject(gameObject);
  }
}

function createItemContainerGameObjects(
  gameObjectRegistrar: GameObjectRegistrar,
  gameObjectType: string,
  level: ILevel
) {
  for (let i = 0; i < gameObjectRegistrar.Locations.length; i++) {
    const gameObjectLocation = gameObjectRegistrar.Locations[i];
    const gameObject = new constructors[gameObjectType](
      new Phaser.Math.Vector2(gameObjectLocation.X, gameObjectLocation.Y),
      new constructors[(gameObjectRegistrar.ItemTypes as string[])[i]]()
    );

    level.registerGameObject(gameObject);
  }
}

function createNonCollidableGameObjects(
  gameObjectRegistrar: GameObjectRegistrar,
  gameObjectType: string,
  level: ILevel
) {
  for (let i = 0; i < gameObjectRegistrar.Locations.length; i++) {
    const gameObjectLocation = gameObjectRegistrar.Locations[i];
    const gameObject = new constructors[gameObjectType](
      new Phaser.Math.Vector2(gameObjectLocation.X, gameObjectLocation.Y)
    );

    level.unregisterGameObject(gameObject);
  }
}

function createPipeGameObject(
  gameObjectRegistrar: GameObjectRegistrar,
  gameObjectType: string,
  level: ILevel
) {
  for (let i = 0; i < gameObjectRegistrar.Locations.length; i++) {
    const gameObjectLocation = gameObjectRegistrar.Locations[i];
    const gameObject = new constructors[gameObjectType](
      new Phaser.Math.Vector2(gameObjectLocation.X, gameObjectLocation.Y),
      new Phaser.Math.Vector2(
        gameObjectRegistrar.WarpLocations?.[i].X,
        gameObjectRegistrar.WarpLocations?.[i].Y
      )
    );

    level.registerGameObject(gameObject);
  }
}

function createScenery(
  gameObjectRegistrar: GameObjectRegistrar,
  gameObjectType: string,
  level: ILevel
) {
  for (let i = 0; i < gameObjectRegistrar.Locations.length; i++) {
    const gameObjectLocation = gameObjectRegistrar.Locations[i];
    const gameObject = new constructors['Scenery'](
      new Phaser.Math.Vector2(gameObjectLocation.X, gameObjectLocation.Y),
      gameObjectType
    );

    level.unregisterGameObject(gameObject);
  }
}
