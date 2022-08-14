import { IPipe } from '../../../game-objects/block/types';
import { IPlayer } from '../../../game-objects/player/types';
import { Command } from '../../../input/commands/Command';
import { PlayerWarpPipeCollisionHandler } from '../../handler/PlayerWarpPipeCollisionHandler';

export class WarpUpCommand extends Command<PlayerWarpPipeCollisionHandler> {
  constructor(player: IPlayer, pipe: IPipe) {
    super(new PlayerWarpPipeCollisionHandler(player, pipe));
  }

  public override execute(): void {
    this.receiver.handleBottomPlayerWarpPipeCollision();
  }
}
