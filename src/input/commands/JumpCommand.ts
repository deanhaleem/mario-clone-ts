import { IPlayer } from '../../game-objects/player/types';
import { Command } from './Command';

export class JumpCommand extends Command<IPlayer> {
  constructor(player: IPlayer) {
    super(player);
  }

  public override execute(): void {
    this.receiver.jump();
  }
}
