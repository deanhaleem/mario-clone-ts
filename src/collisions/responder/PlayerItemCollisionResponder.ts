/* eslint-disable @typescript-eslint/no-unused-vars */
import { IItem } from '../../game-objects/item/types';
import { PlayerDecorator } from '../../game-objects/player/PlayerDecorator';
import { IPlayer } from '../../game-objects/player/types';
import { ICollidable } from '../../physics/types';
import { physics } from '../../utils/constants/Physics';
import { ICollision } from '../types';

export function respondToPlayerItemCollision(
  collisionInstigator: ICollidable,
  collisionReceiver: ICollidable,
  collision: ICollision
): void {
  if (collisionInstigator.collisionDetails.interface === 'IPlayer') {
    const collisionType = `${collisionInstigator.constructor.name},${
      (collisionInstigator as IPlayer).powerUpState.constructor.name
    },${collisionReceiver.constructor.name}`;
    if (playerItemCollisionCommands[collisionType]) {
      playerItemCollisionCommands[collisionType](
        collisionInstigator as IPlayer,
        collisionReceiver as IItem,
        collision
      );
    }
  } else {
    const collisionType = `${collisionInstigator.constructor.name},${
      (collisionInstigator as IPlayer).powerUpState.constructor.name
    },${collisionReceiver.constructor.name}`;
    if (playerItemCollisionCommands[collisionType]) {
      playerItemCollisionCommands[collisionType](
        collisionReceiver as IPlayer,
        collisionInstigator as IItem,
        collision
      );
    }
  }
}

export function handlePlayerFireFlowerCollision(
  player: IPlayer,
  item: IItem,
  collision: ICollision
) {
  player.upgrade();
  // Game1.instance.disposeOfObject(item);

  // StatManager.instance.gainPoints(collision.intersection, 'handlePlayerFireFlowerCollision')
}

export function handlePlayerGreenMushroomCollision(
  player: IPlayer,
  item: IItem,
  collision: ICollision
) {
  // Game1.instance.disposeOfObject(item);
  // StatManager.instance.gainPoints(collision.intersection, 'handlePlayerGreenMushroomCollision')
  // StatManager.instance.GainOrLoseLife(true)
  // SoundManager.instance.playSoundEffect('handlePlayerGreenMushroomCollision')
}

export function handlePlayerRedMushroomCollision(
  player: IPlayer,
  item: IItem,
  collision: ICollision
) {
  player.upgrade();
  // Game1.instance.disposeOfObject(item);

  // StatManager.instance.gainPoints(collision.intersection, 'handlePlayerRedMushroomCollision')
}

export function handlePlayerNonSpinningCoinCollision(
  player: IPlayer,
  item: IItem,
  collision: ICollision
) {
  // Game1.instance.disposeOfObject(item);
  // StatManager.instance.gainPoints(collision.intersection, 'handlePlayerNonSpinningCoinCollision')
  // StatManager.instance.GainCoin()
  // SoundManager.instance.playSoundEffect('handlePlayerNonSpinningCoinCollision')
}

export function handlePlayerStarCollision(
  player: IPlayer,
  item: IItem,
  collision: ICollision
) {
  // Game1.instance.player = new StarMario(player);
  player.decorate();
  // Game1.instance.disposeOfObject(item);

  // StatManager.instance.gainPoints(collision.intersection, 'handlePlayerStarCollision')
}

export function handleNonUpgradingPlayerPowerUpCollision(
  player: IPlayer,
  item: IItem,
  collision: ICollision
) {
  // Game1.instance.disposeOfObject(item);
  // StatManager.instance.gainPoints()
}

export function handleBlinkingPlayerRedMushroomCollision(
  player: IPlayer,
  item: IItem,
  collision: ICollision
) {
  (player as PlayerDecorator)?.removeDecorator();
  player.upgrade();
  // Game1.instance.disposeOfObject(item)

  // StatManager.instance.gainPoints(collision.intersection, 'handleBlinkingPlayerRedMushroomCollision')
}

export function handleBlinkingPlayerFireFlowerCollision(
  player: IPlayer,
  item: IItem,
  collision: ICollision
) {
  (player as PlayerDecorator)?.removeDecorator();
  player.upgrade();
  // Game1.instance.disposeOfObject(item)

  // StatManager.instance.gainPoints(collision.intersection, 'handleBlinkingPlayerFireFlowerCollision')
}

export function handleBlinkingPlayerStarCollision(
  player: IPlayer,
  item: IItem,
  collision: ICollision
) {
  (player as PlayerDecorator)?.removeDecorator();
  // Game1.instance.player = new StarMario(player);
  player.upgrade();
  // Game1.instance.disposeOfObject(item)

  // StatManager.instance.gainPoints(collision.intersection, 'handleBlinkingPlayerStarCollision')
}

export function handlePlayerFlagpoleCollision(
  player: IPlayer,
  item: IItem,
  collision: ICollision
) {
  // if (Game1.instance.gameState.constructor.name !== 'VictoryGameState')

  (player as PlayerDecorator)?.removeDecorator();
  player.winLevel();
  player.applyImpulse(physics.slideDownFlagImpulse);
  item.fall();
  // Game1.instance.endLevel();

  // StatManager.instance.gainPoints(collision.intersection, 'handlePlayerFlagpoleCollision')
}

export function handlePlayerCastleDoorCollision(
  player: IPlayer,
  item: IItem,
  collision: ICollision
) {
  player.location = new Phaser.Math.Vector2(
    player.location.x,
    -player.location.y
  );
  player.winLevel();
  // Game1.instance.tallyUp();
}

const playerItemCollisionCommands: {
  [key: string]: (player: IPlayer, item: IItem, collison: ICollision) => void;
} = {
  'Mario,SmallPowerUpState,FireFlower': handlePlayerRedMushroomCollision,
  'Mario,BigPowerUpState,FireFlower': handlePlayerFireFlowerCollision,
  'Mario,FirePowerUpState,FireFlower': handleNonUpgradingPlayerPowerUpCollision,

  'Mario,SmallPowerUpState,GreenMushroom': handlePlayerGreenMushroomCollision,
  'Mario,BigPowerUpState,GreenMushroom': handlePlayerGreenMushroomCollision,
  'Mario,FirePowerUpState,GreenMushroom': handlePlayerGreenMushroomCollision,

  'Mario,SmallPowerUpState,RedMushroom': handlePlayerRedMushroomCollision,
  'Mario,BigPowerUpState,RedMushroom': handleNonUpgradingPlayerPowerUpCollision,
  'Mario,FirePowerUpState,RedMushroom':
    handleNonUpgradingPlayerPowerUpCollision,

  'Mario,SmallPowerUpState,NonSpinningCoin':
    handlePlayerNonSpinningCoinCollision,
  'Mario,BigPowerUpState,NonSpinningCoin': handlePlayerNonSpinningCoinCollision,
  'Mario,FirePowerUpState,NonSpinningCoin':
    handlePlayerNonSpinningCoinCollision,

  'Mario,SmallPowerUpState,Star': handlePlayerStarCollision,
  'Mario,BigPowerUpState,Star': handlePlayerStarCollision,
  'Mario,FirePowerUpState,Star': handlePlayerStarCollision,

  'Mario,SmallPowerUpState,Flagpole': handlePlayerFlagpoleCollision,
  'Mario,BigPowerUpState,Flagpole': handlePlayerFlagpoleCollision,
  'Mario,FirePowerUpState,Flagpole': handlePlayerFlagpoleCollision,

  'Mario,SmallPowerUpState,CastleDoor': handlePlayerCastleDoorCollision,
  'Mario,BigPowerUpState,CastleDoor': handlePlayerCastleDoorCollision,
  'Mario,FirePowerUpState,CastleDoor': handlePlayerCastleDoorCollision,

  'StarMario,SmallPowerUpState,FireFlower': handlePlayerRedMushroomCollision,
  'StarMario,BigPowerUpState,FireFlower': handlePlayerFireFlowerCollision,
  'StarMario,FirePowerUpState,FireFlower':
    handleNonUpgradingPlayerPowerUpCollision,

  'StarMario,SmallPowerUpState,GreenMushroom':
    handlePlayerGreenMushroomCollision,
  'StarMario,BigPowerUpState,GreenMushroom': handlePlayerGreenMushroomCollision,
  'StarMario,FirePowerUpState,GreenMushroom':
    handlePlayerGreenMushroomCollision,

  'StarMario,SmallPowerUpState,RedMushroom': handlePlayerRedMushroomCollision,
  'StarMario,BigPowerUpState,RedMushroom':
    handleNonUpgradingPlayerPowerUpCollision,
  'StarMario,FirePowerUpState,RedMushroom':
    handleNonUpgradingPlayerPowerUpCollision,

  'StarMario,SmallPowerUpState,NonSpinningCoin':
    handlePlayerNonSpinningCoinCollision,
  'StarMario,BigPowerUpState,NonSpinningCoin':
    handlePlayerNonSpinningCoinCollision,
  'StarMario,FirePowerUpState,NonSpinningCoin':
    handlePlayerNonSpinningCoinCollision,

  'StarMario,SmallPowerUpState,Star': handlePlayerStarCollision,
  'StarMario,BigPowerUpState,Star': handlePlayerStarCollision,
  'StarMario,FirePowerUpState,Star': handlePlayerStarCollision,

  'StarMario,SmallPowerUpState,Flagpole': handlePlayerFlagpoleCollision,
  'StarMario,BigPowerUpState,Flagpole': handlePlayerFlagpoleCollision,
  'StarMario,FirePowerUpState,Flagpole': handlePlayerFlagpoleCollision,

  'BlinkingMario,SmallPowerUpState,FireFlower':
    handleBlinkingPlayerRedMushroomCollision,
  'BlinkingMario,SmallPowerUpState,GreenMushroom':
    handlePlayerGreenMushroomCollision,
  'BlinkingMario,SmallPowerUpState,RedMushroom':
    handleBlinkingPlayerRedMushroomCollision,
  'BlinkingMario,SmallPowerUpState,NonSpinningCoin':
    handlePlayerNonSpinningCoinCollision,
  'BlinkingMario,SmallPowerUpState,Star':
    handleBlinkingPlayerRedMushroomCollision,
  'BlinkingMario,SmallPowerUpState,Flagpole': handlePlayerFlagpoleCollision,
};
