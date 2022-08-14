import { IEnemy } from '../../game-objects/enemy/types';
import { ICommand } from '../../input/types';
import { ICollidable } from '../../physics/types';
import { Constructor } from '../../types';
import { DamagePlayerCommand } from '../command/player/DamagePlayerCommand';
import { FlipEnemyCommand } from '../command/player/FlipEnemyCommand';
import { PushLeftOrDamagePlayerCommand } from '../command/player/PushLeftOrDamagePlayerCommand';
import { PushPlayerUpDisarmEnemyCommand } from '../command/player/PushPlayerUpDisarmEnemyCommand';
import { PushPlayerUpStompEnemyCommand } from '../command/player/PushPlayerUpStompEnemyCommand';
import { PushPlayerUpStompOrMoveShellCommand } from '../command/player/PushPlayerUpStompOrMoveShellCommand';
import { PushRightOrDamagePlayerCommand } from '../command/player/PushRightOrDamagePlayerCommand';
import { ICollision, ICollisionResponder } from '../types';

export class PlayerEnemyCollisionResponder implements ICollisionResponder {
  private readonly playerEnemyCollisionCommands: {
    [key: string]: Constructor<ICommand>;
  };

  public respondToCollision(
    collisionInstigator: ICollidable,
    collisionReceiver: ICollidable,
    collision: ICollision
  ): void {
    if (collisionInstigator.collisionDetails.interface === 'IPlayer') {
      const collisionType = `${collisionInstigator.constructor.name},${
        collisionReceiver.constructor.name
      },${(collisionReceiver as IEnemy).enemyState.constructor.name},${
        collision.direction
      }`;
      if (this.playerEnemyCollisionCommands[collisionType]) {
        new this.playerEnemyCollisionCommands[collisionType](
          collisionInstigator,
          collisionReceiver,
          collision
        ).execute();
      }
    } else {
      const collisionType = `${collisionInstigator.constructor.name},${
        collisionReceiver.constructor.name
      },${(collisionInstigator as IEnemy).enemyState.constructor.name},${
        collision.direction
      }`;
      if (this.playerEnemyCollisionCommands[collisionType]) {
        new this.playerEnemyCollisionCommands[collisionType](
          collisionReceiver,
          collisionInstigator,
          collision
        ).execute();
      }
    }
  }

  constructor() {
    this.playerEnemyCollisionCommands = {
      'Mario,Goomba,WalkingEnemyState,TopCollision':
        PushPlayerUpStompEnemyCommand,
      'Mario,Goomba,WalkingEnemyState,BottomCollision': DamagePlayerCommand,
      'Mario,Goomba,WalkingEnemyState,LeftCollision': DamagePlayerCommand,
      'Mario,Goomba,WalkingEnemyState,RightCollision': DamagePlayerCommand,

      'Mario,Koopa,WalkingEnemyState,TopCollision':
        PushPlayerUpDisarmEnemyCommand,
      'Mario,Koopa,WalkingEnemyState,BottomCollision': DamagePlayerCommand,
      'Mario,Koopa,WalkingEnemyState,LeftCollision': DamagePlayerCommand,
      'Mario,Koopa,WalkingEnemyState,RightCollision': DamagePlayerCommand,

      'Mario,Koopa,ShellEnemyState,TopCollision':
        PushPlayerUpStompOrMoveShellCommand,
      'Mario,Koopa,ShellEnemyState,BottomCollision': DamagePlayerCommand,
      'Mario,Koopa,ShellEnemyState,LeftCollision':
        PushRightOrDamagePlayerCommand,
      'Mario,Koopa,ShellEnemyState,RightCollision':
        PushLeftOrDamagePlayerCommand,

      'StarMario,Goomba,WalkingEnemyState,TopCollision': FlipEnemyCommand,
      'StarMario,Goomba,WalkingEnemyState,BottomCollision': FlipEnemyCommand,
      'StarMario,Goomba,WalkingEnemyState,LeftCollision': FlipEnemyCommand,
      'StarMario,Goomba,WalkingEnemyState,RightCollision': FlipEnemyCommand,

      'StarMario,Koopa,WalkingEnemyState,TopCollision': FlipEnemyCommand,
      'StarMario,Koopa,WalkingEnemyState,BottomCollision': FlipEnemyCommand,
      'StarMario,Koopa,WalkingEnemyState,LeftCollision': FlipEnemyCommand,
      'StarMario,Koopa,WalkingEnemyState,RightCollision': FlipEnemyCommand,

      'StarMario,Koopa,ShellEnemyState,TopCollision': FlipEnemyCommand,
      'StarMario,Koopa,ShellEnemyState,BottomCollision': FlipEnemyCommand,
      'StarMario,Koopa,ShellEnemyState,LeftCollision': FlipEnemyCommand,
      'StarMario,Koopa,ShellEnemyState,RightCollision': FlipEnemyCommand,

      'BlinkingMario,Goomba,WalkingEnemyState,TopCollision':
        PushPlayerUpStompEnemyCommand,
      'BlinkingMario,Koopa,WalkingEnemyState,TopCollision':
        PushPlayerUpDisarmEnemyCommand,
      'BlinkingMario,Koopa,ShellEnemyState,TopCollision':
        PushPlayerUpStompEnemyCommand,

      'Goomba,Mario,WalkingEnemyState,TopCollision': DamagePlayerCommand,
      'Goomba,Mario,WalkingEnemyState,BottomCollision':
        PushPlayerUpStompEnemyCommand,
      'Goomba,Mario,WalkingEnemyState,LeftCollision': DamagePlayerCommand,
      'Goomba,Mario,WalkingEnemyState,RightCollision': DamagePlayerCommand,

      'Koopa,Mario,WalkingEnemyState,TopCollision': DamagePlayerCommand,
      'Koopa,Mario,WalkingEnemyState,BottomCollision':
        PushPlayerUpDisarmEnemyCommand,
      'Koopa,Mario,WalkingEnemyState,LeftCollision': DamagePlayerCommand,
      'Koopa,Mario,WalkingEnemyState,RightCollision': DamagePlayerCommand,

      'Koopa,Mario,ShellEnemyState,TopCollision': DamagePlayerCommand,
      'Koopa,Mario,ShellEnemyState,BottomCollision':
        PushPlayerUpStompEnemyCommand,
      'Koopa,Mario,ShellEnemyState,LeftCollision': DamagePlayerCommand,
      'Koopa,Mario,ShellEnemyState,RightCollision': DamagePlayerCommand,

      'Goomba,StarMario,WalkingEnemyState,TopCollision': FlipEnemyCommand,
      'Goomba,StarMario,WalkingEnemyState,BottomCollision': FlipEnemyCommand,
      'Goomba,StarMario,WalkingEnemyState,LeftCollision': FlipEnemyCommand,
      'Goomba,StarMario,WalkingEnemyState,RightCollision': FlipEnemyCommand,

      'Koopa,StarMario,WalkingEnemyState,TopCollision': FlipEnemyCommand,
      'Koopa,StarMario,WalkingEnemyState,BottomCollision': FlipEnemyCommand,
      'Koopa,StarMario,WalkingEnemyState,LeftCollision': FlipEnemyCommand,
      'Koopa,StarMario,WalkingEnemyState,RightCollision': FlipEnemyCommand,

      'Koopa,StarMario,ShellEnemyState,TopCollision': FlipEnemyCommand,
      'Koopa,StarMario,ShellEnemyState,BottomCollision': FlipEnemyCommand,
      'Koopa,StarMario,ShellEnemyState,LeftCollision': FlipEnemyCommand,
      'Koopa,StarMario,ShellEnemyState,RightCollision': FlipEnemyCommand,

      'Goomba,BlinkingMario,WalkingEnemyState,BottomCollision':
        PushPlayerUpStompEnemyCommand,
      'Koopa,BlinkingMario,WalkingEnemyState,BottomCollision':
        PushPlayerUpDisarmEnemyCommand, // TODO: in og, this was stomp and below was disarm
      'Koopa,BlinkingMario,ShellEnemyState,BottomCollision':
        PushPlayerUpStompEnemyCommand,
    };
  }
}
