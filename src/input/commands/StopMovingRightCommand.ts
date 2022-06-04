import { IPlayer } from '../../game-objects/player/types';
import { Command } from './Command';

export class StopMovingRight extends Command<IPlayer> {
  constructor(player: IPlayer) {
    super(player);
  }

  public override execute(): void {
    this.receiver.stopMovingRight();
  }
}
