import { IPlayer } from '../../game-objects/player/types';
import { ICommand } from '../../input/types';
import { ICollidable } from '../../physics/types';
import { Constructor } from '../../types';
import { PushPlayerDownBumpBlockCommand } from '../command/player/PushPlayerDownBumpBlockCommand';
import { PushPlayerDownBumpRevealedBlockCommand } from '../command/player/PushPlayerDownBumpRevealedBlockCommand';
import { PushPlayerDownDestroyBlockCommand } from '../command/player/PushPlayerDownDestroyBlockCommand';
import { PushPlayerDownNotWarpingCommand } from '../command/player/PushPlayerDownNotWarpingCommand';
import { PushPlayerDownSpawnFireFlowerCommand } from '../command/player/PushPlayerDownSpawnFireFlowerCommand';
import { PushPlayerLeftCommand } from '../command/player/PushPlayerLeftCommand';
import { PushPlayerLeftNotWarpingCommand } from '../command/player/PushPlayerLeftNotWarpingCommand';
import { PushPlayerRightCommand } from '../command/player/PushPlayerRightCommand';
import { PushPlayerRightNotWarpingCommand } from '../command/player/PushPlayerRightNotWarpingCommand';
import { PushPlayerUpCommand } from '../command/player/PushPlayerUpCommand';
import { PushPlayerUpNotWarpingCommand } from '../command/player/PushPlayerUpNotWarpingCommand';
import { ICollision, ICollisionResponder } from '../types';

export class PlayerBlockCollisionResponder implements ICollisionResponder {
  private readonly playerBlockCollisionCommands: {
    [key: string]: Constructor<ICommand>;
  };

  public respondToCollision(
    player: ICollidable,
    block: ICollidable,
    collision: ICollision
  ): void {
    const collisionType = `${
      (player as IPlayer).powerUpState.constructor.name
    },${block.constructor.name},${collision.direction}`;
    // console.log(collisionType);
    if (this.playerBlockCollisionCommands[collisionType]) {
      new this.playerBlockCollisionCommands[collisionType](
        player,
        block,
        collision
      ).execute();
    }
  }

  constructor() {
    this.playerBlockCollisionCommands = {
      'SmallPowerUpState,ItemBrickBlock,TopCollision': PushPlayerUpCommand,
      'SmallPowerUpState,ItemBrickBlock,BottomCollision':
        PushPlayerDownBumpBlockCommand,
      'SmallPowerUpState,ItemBrickBlock,LeftCollision': PushPlayerRightCommand,
      'SmallPowerUpState,ItemBrickBlock,RightCollision': PushPlayerLeftCommand,

      'SmallPowerUpState,BrickBlock,TopCollision': PushPlayerUpCommand,
      'SmallPowerUpState,BrickBlock,BottomCollision':
        PushPlayerDownBumpBlockCommand,
      'SmallPowerUpState,BrickBlock,LeftCollision': PushPlayerRightCommand,
      'SmallPowerUpState,BrickBlock,RightCollision': PushPlayerLeftCommand,

      'SmallPowerUpState,BrickCollectionBlock,TopCollision':
        PushPlayerUpCommand,
      'SmallPowerUpState,BrickCollectionBlock,BottomCollision':
        PushPlayerDownBumpBlockCommand,
      'SmallPowerUpState,BrickCollectionBlock,LeftCollision':
        PushPlayerRightCommand,
      'SmallPowerUpState,BrickCollectionBlock,RightCollision':
        PushPlayerLeftCommand,

      'SmallPowerUpState,HiddenBlock,BottomCollision':
        PushPlayerDownBumpRevealedBlockCommand,

      'SmallPowerUpState,NonPowerUpQuestionBlock,TopCollision':
        PushPlayerUpCommand,
      'SmallPowerUpState,NonPowerUpQuestionBlock,BottomCollision':
        PushPlayerDownBumpBlockCommand,
      'SmallPowerUpState,NonPowerUpQuestionBlock,LeftCollision':
        PushPlayerRightCommand,
      'SmallPowerUpState,NonPowerUpQuestionBlock,RightCollision':
        PushPlayerLeftCommand,

      'SmallPowerUpState,PowerUpQuestionBlock,TopCollision':
        PushPlayerUpCommand,
      'SmallPowerUpState,PowerUpQuestionBlock,BottomCollision':
        PushPlayerDownBumpBlockCommand,
      'SmallPowerUpState,PowerUpQuestionBlock,LeftCollision':
        PushPlayerRightCommand,
      'SmallPowerUpState,PowerUpQuestionBlock,RightCollision':
        PushPlayerLeftCommand,

      'SmallPowerUpState,FloorBlock,TopCollision': PushPlayerUpCommand,
      'SmallPowerUpState,FloorBlock,BottomCollision':
        PushPlayerDownBumpBlockCommand,
      'SmallPowerUpState,FloorBlock,LeftCollision': PushPlayerRightCommand,
      'SmallPowerUpState,FloorBlock,RightCollision': PushPlayerLeftCommand,

      'SmallPowerUpState,StairBlock,TopCollision': PushPlayerUpCommand,
      'SmallPowerUpState,StairBlock,BottomCollision':
        PushPlayerDownBumpBlockCommand,
      'SmallPowerUpState,StairBlock,LeftCollision': PushPlayerRightCommand,
      'SmallPowerUpState,StairBlock,RightCollision': PushPlayerLeftCommand,

      'SmallPowerUpState,UsedBlock,TopCollision': PushPlayerUpCommand,
      'SmallPowerUpState,UsedBlock,BottomCollision':
        PushPlayerDownBumpBlockCommand,
      'SmallPowerUpState,UsedBlock,LeftCollision': PushPlayerRightCommand,
      'SmallPowerUpState,UsedBlock,RightCollision': PushPlayerLeftCommand,

      'SmallPowerUpState,SmallVerticalGreenPipe,TopCollision':
        PushPlayerUpNotWarpingCommand,
      'SmallPowerUpState,SmallVerticalGreenPipe,BottomCollision':
        PushPlayerDownNotWarpingCommand,
      'SmallPowerUpState,SmallVerticalGreenPipe,LeftCollision':
        PushPlayerRightNotWarpingCommand,
      'SmallPowerUpState,SmallVerticalGreenPipe,RightCollision':
        PushPlayerLeftNotWarpingCommand,

      'SmallPowerUpState,MediumVerticalGreenPipe,TopCollision':
        PushPlayerUpNotWarpingCommand,
      'SmallPowerUpState,MediumVerticalGreenPipe,BottomCollision':
        PushPlayerDownNotWarpingCommand,
      'SmallPowerUpState,MediumVerticalGreenPipe,LeftCollision':
        PushPlayerRightNotWarpingCommand,
      'SmallPowerUpState,MediumVerticalGreenPipe,RightCollision':
        PushPlayerLeftNotWarpingCommand,

      'SmallPowerUpState,LargeVerticalGreenPipe,TopCollision':
        PushPlayerUpNotWarpingCommand,
      'SmallPowerUpState,LargeVerticalGreenPipe,BottomCollision':
        PushPlayerDownNotWarpingCommand,
      'SmallPowerUpState,LargeVerticalGreenPipe,LeftCollision':
        PushPlayerRightNotWarpingCommand,
      'SmallPowerUpState,LargeVerticalGreenPipe,RightCollision':
        PushPlayerLeftNotWarpingCommand,

      'SmallPowerUpState,HorizontalGreenPipe,TopCollision':
        PushPlayerUpNotWarpingCommand,
      'SmallPowerUpState,HorizontalGreenPipe,BottomCollision':
        PushPlayerDownNotWarpingCommand,
      'SmallPowerUpState,HorizontalGreenPipe,LeftCollision':
        PushPlayerRightNotWarpingCommand,
      'SmallPowerUpState,HorizontalGreenPipe,RightCollision':
        PushPlayerLeftNotWarpingCommand,

      'SmallPowerUpState,LargeGreenPipeShaft,TopCollision': PushPlayerUpCommand,
      'SmallPowerUpState,LargeGreenPipeShaft,BottomCollision':
        PushPlayerDownBumpBlockCommand,
      'SmallPowerUpState,LargeGreenPipeShaft,LeftCollision':
        PushPlayerRightCommand,
      'SmallPowerUpState,LargeGreenPipeShaft,RightCollision':
        PushPlayerLeftCommand,

      'BigPowerUpState,ItemBrickBlock,TopCollision': PushPlayerUpCommand,
      'BigPowerUpState,ItemBrickBlock,BottomCollision':
        PushPlayerDownBumpBlockCommand,
      'BigPowerUpState,ItemBrickBlock,LeftCollision': PushPlayerRightCommand,
      'BigPowerUpState,ItemBrickBlock,RightCollision': PushPlayerLeftCommand,

      'BigPowerUpState,BrickBlock,TopCollision': PushPlayerUpCommand,
      'BigPowerUpState,BrickBlock,BottomCollision':
        PushPlayerDownDestroyBlockCommand,
      'BigPowerUpState,BrickBlock,LeftCollision': PushPlayerRightCommand,
      'BigPowerUpState,BrickBlock,RightCollision': PushPlayerLeftCommand,

      'BigPowerUpState,BrickCollectionBlock,TopCollision': PushPlayerUpCommand,
      'BigPowerUpState,BrickCollectionBlock,BottomCollision':
        PushPlayerDownBumpBlockCommand, // TODO: Bug? should be destroy
      'BigPowerUpState,BrickCollectionBlock,LeftCollision':
        PushPlayerRightCommand,
      'BigPowerUpState,BrickCollectionBlock,RightCollision':
        PushPlayerLeftCommand,

      'BigPowerUpState,HiddenBlock,BottomCollision':
        PushPlayerDownBumpRevealedBlockCommand,

      'BigPowerUpState,NonPowerUpQuestionBlock,TopCollision':
        PushPlayerUpCommand,
      'BigPowerUpState,NonPowerUpQuestionBlock,BottomCollision':
        PushPlayerDownBumpBlockCommand,
      'BigPowerUpState,NonPowerUpQuestionBlock,LeftCollision':
        PushPlayerRightCommand,
      'BigPowerUpState,NonPowerUpQuestionBlock,RightCollision':
        PushPlayerLeftCommand,

      'BigPowerUpState,PowerUpQuestionBlock,TopCollision': PushPlayerUpCommand,
      'BigPowerUpState,PowerUpQuestionBlock,BottomCollision':
        PushPlayerDownSpawnFireFlowerCommand,
      'BigPowerUpState,PowerUpQuestionBlock,LeftCollision':
        PushPlayerRightCommand,
      'BigPowerUpState,PowerUpQuestionBlock,RightCollision':
        PushPlayerLeftCommand,

      'BigPowerUpState,FloorBlock,TopCollision': PushPlayerUpCommand,
      'BigPowerUpState,FloorBlock,BottomCollision':
        PushPlayerDownBumpBlockCommand,
      'BigPowerUpState,FloorBlock,LeftCollision': PushPlayerRightCommand,
      'BigPowerUpState,FloorBlock,RightCollision': PushPlayerLeftCommand,

      'BigPowerUpState,StairBlock,TopCollision': PushPlayerUpCommand,
      'BigPowerUpState,StairBlock,BottomCollision':
        PushPlayerDownBumpBlockCommand,
      'BigPowerUpState,StairBlock,LeftCollision': PushPlayerRightCommand,
      'BigPowerUpState,StairBlock,RightCollision': PushPlayerLeftCommand,

      'BigPowerUpState,UsedBlock,TopCollision': PushPlayerUpCommand,
      'BigPowerUpState,UsedBlock,BottomCollision':
        PushPlayerDownBumpBlockCommand,
      'BigPowerUpState,UsedBlock,LeftCollision': PushPlayerRightCommand,
      'BigPowerUpState,UsedBlock,RightCollision': PushPlayerLeftCommand,

      'BigPowerUpState,SmallVerticalGreenPipe,TopCollision':
        PushPlayerUpNotWarpingCommand,
      'BigPowerUpState,SmallVerticalGreenPipe,BottomCollision':
        PushPlayerDownNotWarpingCommand,
      'BigPowerUpState,SmallVerticalGreenPipe,LeftCollision':
        PushPlayerRightNotWarpingCommand,
      'BigPowerUpState,SmallVerticalGreenPipe,RightCollision':
        PushPlayerLeftNotWarpingCommand,

      'BigPowerUpState,MediumVerticalGreenPipe,TopCollision':
        PushPlayerUpNotWarpingCommand,
      'BigPowerUpState,MediumVerticalGreenPipe,BottomCollision':
        PushPlayerDownNotWarpingCommand,
      'BigPowerUpState,MediumVerticalGreenPipe,LeftCollision':
        PushPlayerRightNotWarpingCommand,
      'BigPowerUpState,MediumVerticalGreenPipe,RightCollision':
        PushPlayerLeftNotWarpingCommand,

      'BigPowerUpState,LargeVerticalGreenPipe,TopCollision':
        PushPlayerUpNotWarpingCommand,
      'BigPowerUpState,LargeVerticalGreenPipe,BottomCollision':
        PushPlayerDownNotWarpingCommand,
      'BigPowerUpState,LargeVerticalGreenPipe,LeftCollision':
        PushPlayerRightNotWarpingCommand,
      'BigPowerUpState,LargeVerticalGreenPipe,RightCollision':
        PushPlayerLeftNotWarpingCommand,

      'BigPowerUpState,HorizontalGreenPipe,TopCollision':
        PushPlayerUpNotWarpingCommand,
      'BigPowerUpState,HorizontalGreenPipe,BottomCollision':
        PushPlayerDownNotWarpingCommand,
      'BigPowerUpState,HorizontalGreenPipe,LeftCollision':
        PushPlayerRightNotWarpingCommand,
      'BigPowerUpState,HorizontalGreenPipe,RightCollision':
        PushPlayerLeftNotWarpingCommand,

      'BigPowerUpState,LargeGreenPipeShaft,TopCollision': PushPlayerUpCommand,
      'BigPowerUpState,LargeGreenPipeShaft,BottomCollision':
        PushPlayerDownBumpBlockCommand,
      'BigPowerUpState,LargeGreenPipeShaft,LeftCollision':
        PushPlayerRightCommand,
      'BigPowerUpState,LargeGreenPipeShaft,RightCollision':
        PushPlayerLeftCommand,

      'FirePowerUpState,ItemBrickBlock,TopCollision': PushPlayerUpCommand,
      'FirePowerUpState,ItemBrickBlock,BottomCollision':
        PushPlayerDownBumpBlockCommand,
      'FirePowerUpState,ItemBrickBlock,LeftCollision': PushPlayerRightCommand,
      'FirePowerUpState,ItemBrickBlock,RightCollision': PushPlayerLeftCommand,

      'FirePowerUpState,BrickBlock,TopCollision': PushPlayerUpCommand,
      'FirePowerUpState,BrickBlock,BottomCollision':
        PushPlayerDownDestroyBlockCommand,
      'FirePowerUpState,BrickBlock,LeftCollision': PushPlayerRightCommand,
      'FirePowerUpState,BrickBlock,RightCollision': PushPlayerLeftCommand,

      'FirePowerUpState,BrickCollectionBlock,TopCollision': PushPlayerUpCommand,
      'FirePowerUpState,BrickCollectionBlock,BottomCollision':
        PushPlayerDownBumpBlockCommand,
      'FirePowerUpState,BrickCollectionBlock,LeftCollision':
        PushPlayerRightCommand,
      'FirePowerUpState,BrickCollectionBlock,RightCollision':
        PushPlayerLeftCommand,

      'FirePowerUpState,HiddenBlock,BottomCollision':
        PushPlayerDownBumpRevealedBlockCommand,

      'FirePowerUpState,NonPowerUpQuestionBlock,TopCollision':
        PushPlayerUpCommand,
      'FirePowerUpState,NonPowerUpQuestionBlock,BottomCollision':
        PushPlayerDownBumpBlockCommand,
      'FirePowerUpState,NonPowerUpQuestionBlock,LeftCollision':
        PushPlayerRightCommand,
      'FirePowerUpState,NonPowerUpQuestionBlock,RightCollision':
        PushPlayerLeftCommand,

      'FirePowerUpState,PowerUpQuestionBlock,TopCollision': PushPlayerUpCommand,
      'FirePowerUpState,PowerUpQuestionBlock,BottomCollision':
        PushPlayerDownSpawnFireFlowerCommand,
      'FirePowerUpState,PowerUpQuestionBlock,LeftCollision':
        PushPlayerRightCommand,
      'FirePowerUpState,PowerUpQuestionBlock,RightCollision':
        PushPlayerLeftCommand,

      'FirePowerUpState,FloorBlock,TopCollision': PushPlayerUpCommand,
      'FirePowerUpState,FloorBlock,BottomCollision':
        PushPlayerDownBumpBlockCommand,
      'FirePowerUpState,FloorBlock,LeftCollision': PushPlayerRightCommand,
      'FirePowerUpState,FloorBlock,RightCollision': PushPlayerLeftCommand,

      'FirePowerUpState,StairBlock,TopCollision': PushPlayerUpCommand,
      'FirePowerUpState,StairBlock,BottomCollision':
        PushPlayerDownBumpBlockCommand,
      'FirePowerUpState,StairBlock,LeftCollision': PushPlayerRightCommand,
      'FirePowerUpState,StairBlock,RightCollision': PushPlayerLeftCommand,

      'FirePowerUpState,UsedBlock,TopCollision': PushPlayerUpCommand,
      'FirePowerUpState,UsedBlock,BottomCollision':
        PushPlayerDownBumpBlockCommand,
      'FirePowerUpState,UsedBlock,LeftCollision': PushPlayerRightCommand,
      'FirePowerUpState,UsedBlock,RightCollision': PushPlayerLeftCommand,

      'FirePowerUpState,SmallVerticalGreenPipe,TopCollision':
        PushPlayerUpNotWarpingCommand,
      'FirePowerUpState,SmallVerticalGreenPipe,BottomCollision':
        PushPlayerDownNotWarpingCommand,
      'FirePowerUpState,SmallVerticalGreenPipe,LeftCollision':
        PushPlayerRightNotWarpingCommand,
      'FirePowerUpState,SmallVerticalGreenPipe,RightCollision':
        PushPlayerLeftNotWarpingCommand,

      'FirePowerUpState,MediumVerticalGreenPipe,TopCollision':
        PushPlayerUpNotWarpingCommand,
      'FirePowerUpState,MediumVerticalGreenPipe,BottomCollision':
        PushPlayerDownNotWarpingCommand,
      'FirePowerUpState,MediumVerticalGreenPipe,LeftCollision':
        PushPlayerRightNotWarpingCommand,
      'FirePowerUpState,MediumVerticalGreenPipe,RightCollision':
        PushPlayerLeftNotWarpingCommand,

      'FirePowerUpState,LargeVerticalGreenPipe,TopCollision':
        PushPlayerUpNotWarpingCommand,
      'FirePowerUpState,LargeVerticalGreenPipe,BottomCollision':
        PushPlayerDownNotWarpingCommand,
      'FirePowerUpState,LargeVerticalGreenPipe,LeftCollision':
        PushPlayerRightNotWarpingCommand,
      'FirePowerUpState,LargeVerticalGreenPipe,RightCollision':
        PushPlayerLeftNotWarpingCommand,

      'FirePowerUpState,HorizontalGreenPipe,TopCollision':
        PushPlayerUpNotWarpingCommand,
      'FirePowerUpState,HorizontalGreenPipe,BottomCollision':
        PushPlayerDownNotWarpingCommand,
      'FirePowerUpState,HorizontalGreenPipe,LeftCollision':
        PushPlayerRightNotWarpingCommand,
      'FirePowerUpState,HorizontalGreenPipe,RightCollision':
        PushPlayerLeftNotWarpingCommand,

      'FirePowerUpState,LargeGreenPipeShaft,TopCollision':
        PushPlayerUpNotWarpingCommand,
      'FirePowerUpState,LargeGreenPipeShaft,BottomCollision':
        PushPlayerDownNotWarpingCommand,
      'FirePowerUpState,LargeGreenPipeShaft,LeftCollision':
        PushPlayerRightNotWarpingCommand,
      'FirePowerUpState,LargeGreenPipeShaft,RightCollision':
        PushPlayerLeftNotWarpingCommand,
    };
  }
}
