import { IPlayer } from '../../game-objects/player/types';
import { Command } from './Command';

export class StopJumpingCommand extends Command<IPlayer> {
  constructor(player: IPlayer) {
    super(player);
  }

  public override execute(): void {
    this.receiver.stopJumping();
  }
}
