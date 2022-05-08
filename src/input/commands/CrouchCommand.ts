import { IPlayer } from '../../game-objects/players/types';
import { Command } from './Command';

export class CrouchCommand extends Command<IPlayer> {
  constructor(player: IPlayer) {
    super(player);
  }

  public override execute(): void {
    this.receiver.crouch();
  }
}
