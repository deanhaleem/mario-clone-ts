import { IPlayer } from '../../game-objects/player/types';
import { Command } from './Command';

export class WalkLeftCommand extends Command<IPlayer> {
  constructor(player: IPlayer) {
    super(player);
  }

  public override execute(): void {
    this.receiver.walkLeft();
  }
}
