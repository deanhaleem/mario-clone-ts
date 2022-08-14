import { IBlock } from '../../../game-objects/block/types';
import { IPlayer } from '../../../game-objects/player/types';
import { Command } from '../../../input/commands/Command';
import { PlayerBlockCollisionHandler } from '../../handler/PlayerBlockCollisionHandler';
import { ICollision } from '../../types';

export class PushPlayerRightNotWarpingCommand extends Command<PlayerBlockCollisionHandler> {
  constructor(player: IPlayer, block: IBlock, collision: ICollision) {
    super(new PlayerBlockCollisionHandler(player, block, collision));
  }

  public override execute(): void {
    this.receiver.handleLeftPlayerPipeCollision();
  }
}
