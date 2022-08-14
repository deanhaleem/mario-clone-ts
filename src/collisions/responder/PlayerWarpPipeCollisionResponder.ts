import { ICommand } from '../../input/types';
import { ICollidable } from '../../physics/types';
import { Constructor } from '../../types';
import { WarpDownCommand } from '../command/player/WarpDownCommand';
import { WarpRightCommand } from '../command/player/WarpRightCommand';
import { WarpUpCommand } from '../command/player/WarpUpCommand';
import { ICollision, ICollisionResponder } from '../types';

export class PlayerWarpPipeCollisionResponder implements ICollisionResponder {
  private readonly playerWarpPipeCollisionCommands: {
    [key: string]: Constructor<ICommand>;
  };

  public respondToCollision(
    player: ICollidable,
    pipe: ICollidable,
    collision: ICollision
  ): void {
    if (
      this.playerWarpPipeCollisionCommands[
        `${pipe.constructor.name},${collision.direction}`
      ]
    ) {
      new this.playerWarpPipeCollisionCommands[
        `${pipe.constructor.name},${collision.direction}`
      ](player, pipe).execute();
    }
  }

  constructor() {
    this.playerWarpPipeCollisionCommands = {
      'LargeVerticalGreenPipe,TopCollision': WarpDownCommand,
      'SmallVerticalGreenPipe,TopCollision': WarpDownCommand,
      'SmallVerticalGreenPipe,BottomCollision': WarpUpCommand,
      'HorizontalGreenPipe,RightCollision': WarpRightCommand,
    };
  }
}
