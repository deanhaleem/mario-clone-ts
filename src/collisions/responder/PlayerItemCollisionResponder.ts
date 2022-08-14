import { IEnemy } from '../../game-objects/enemy/types';
import { IPlayer } from '../../game-objects/player/types';
import { ICommand } from '../../input/types';
import { ICollidable } from '../../physics/types';
import { Constructor } from '../../types';
import { GainLifeCommand } from '../command/player/GainLifeCommand';
import { PickUpCoinCommand } from '../command/player/PickUpCoinCommand';
import { PickUpPowerUpCommand } from '../command/player/PickUpPowerUpCommand';
import { RemovePlayerFromScreenCommand } from '../command/player/RemovePlayerFromScreenCommand';
import { TurnBlinkingMarioBigCommand } from '../command/player/TurnBlinkingMarioBigCommand';
import { TurnPlayerBigCommand } from '../command/player/TurnPlayerBigCommand';
import { TurnPlayerFireCommand } from '../command/player/TurnPlayerFireCommand';
import { TurnPlayerStarCommand } from '../command/player/TurnPlayerStarCommand';
import { WinLevelCommand } from '../command/player/WinLevelCommand';
import { ICollision, ICollisionResponder } from '../types';

export class PlayerItemCollisionResponder implements ICollisionResponder {
  private readonly playerItemCollisionCommands: {
    [key: string]: Constructor<ICommand>;
  };

  public respondToCollision(
    collisionInstigator: ICollidable,
    collisionReceiver: ICollidable,
    collision: ICollision
  ): void {
    if (collisionInstigator.collisionDetails.interface === 'IPlayer') {
      const collisionType = `${collisionInstigator.constructor.name},${
        (collisionInstigator as IPlayer).powerUpState.constructor.name
      },${collisionReceiver.constructor.name}`;
      if (this.playerItemCollisionCommands[collisionType]) {
        new this.playerItemCollisionCommands[collisionType](
          collisionInstigator,
          collisionReceiver,
          collision
        ).execute();
      }
    } else {
      const collisionType = `${collisionInstigator.constructor.name},${
        (collisionInstigator as IPlayer).powerUpState.constructor.name
      },${collisionReceiver.constructor.name}`;
      if (this.playerItemCollisionCommands[collisionType]) {
        new this.playerItemCollisionCommands[collisionType](
          collisionReceiver,
          collisionInstigator,
          collision
        ).execute();
      }
    }
  }

  constructor() {
    this.playerItemCollisionCommands = {
      'Mario,SmallPowerUpState,FireFlower': TurnPlayerBigCommand,
      'Mario,BigPowerUpState,FireFlower': TurnPlayerFireCommand,
      'Mario,FirePowerUpState,FireFlower': PickUpPowerUpCommand,

      'Mario,SmallPowerUpState,GreenMushroom': GainLifeCommand,
      'Mario,BigPowerUpState,GreenMushroom': GainLifeCommand,
      'Mario,FirePowerUpState,GreenMushroom': GainLifeCommand,

      'Mario,SmallPowerUpState,RedMushroom': TurnPlayerBigCommand,
      'Mario,BigPowerUpState,RedMushroom': PickUpPowerUpCommand,
      'Mario,FirePowerUpState,RedMushroom': PickUpPowerUpCommand,

      'Mario,SmallPowerUpState,NonSpinningCoin': PickUpCoinCommand,
      'Mario,BigPowerUpState,NonSpinningCoin': PickUpCoinCommand,
      'Mario,FirePowerUpState,NonSpinningCoin': PickUpCoinCommand,

      'Mario,SmallPowerUpState,Star': TurnPlayerStarCommand,
      'Mario,BigPowerUpState,Star': TurnPlayerStarCommand,
      'Mario,FirePowerUpState,Star': TurnPlayerStarCommand,

      'Mario,SmallPowerUpState,Flagpole': WinLevelCommand,
      'Mario,BigPowerUpState,Flagpole': WinLevelCommand,
      'Mario,FirePowerUpState,Flagpole': WinLevelCommand,

      'Mario,SmallPowerUpState,CastleDoor': RemovePlayerFromScreenCommand,
      'Mario,BigPowerUpState,CastleDoor': RemovePlayerFromScreenCommand,
      'Mario,FirePowerUpState,CastleDoor': RemovePlayerFromScreenCommand,

      'StarMario,SmallPowerUpState,FireFlower': TurnPlayerBigCommand,
      'StarMario,BigPowerUpState,FireFlower': TurnPlayerFireCommand,
      'StarMario,FirePowerUpState,FireFlower': PickUpPowerUpCommand,

      'StarMario,SmallPowerUpState,GreenMushroom': GainLifeCommand,
      'StarMario,BigPowerUpState,GreenMushroom': GainLifeCommand,
      'StarMario,FirePowerUpState,GreenMushroom': GainLifeCommand,

      'StarMario,SmallPowerUpState,RedMushroom': TurnPlayerBigCommand,
      'StarMario,BigPowerUpState,RedMushroom': PickUpPowerUpCommand,
      'StarMario,FirePowerUpState,RedMushroom': PickUpPowerUpCommand,

      'StarMario,SmallPowerUpState,NonSpinningCoin': PickUpCoinCommand,
      'StarMario,BigPowerUpState,NonSpinningCoin': PickUpCoinCommand,
      'StarMario,FirePowerUpState,NonSpinningCoin': PickUpCoinCommand,

      'StarMario,SmallPowerUpState,Star': TurnPlayerStarCommand,
      'StarMario,BigPowerUpState,Star': TurnPlayerStarCommand,
      'StarMario,FirePowerUpState,Star': TurnPlayerStarCommand,

      'StarMario,SmallPowerUpState,Flagpole': WinLevelCommand,
      'StarMario,BigPowerUpState,Flagpole': WinLevelCommand,
      'StarMario,FirePowerUpState,Flagpole': WinLevelCommand,

      'BlinkingMario,SmallPowerUpState,FireFlower': TurnBlinkingMarioBigCommand,
      'BlinkingMario,SmallPowerUpState,GreenMushroom': GainLifeCommand,
      'BlinkingMario,SmallPowerUpState,RedMushroom':
        TurnBlinkingMarioBigCommand,
      'BlinkingMario,SmallPowerUpState,NonSpinningCoin': PickUpCoinCommand,
      'BlinkingMario,SmallPowerUpState,Star': TurnBlinkingMarioBigCommand,
      'BlinkingMario,SmallPowerUpState,Flagpole': WinLevelCommand,
    };
  }
}
