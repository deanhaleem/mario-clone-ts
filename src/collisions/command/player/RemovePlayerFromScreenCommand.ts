import { IItem } from '../../../game-objects/item/types';
import { IPlayer } from '../../../game-objects/player/types';
import { Command } from '../../../input/commands/Command';
import { PlayerItemCollisionHandler } from '../../handler/PlayerItemCollisionHandler';
import { ICollision } from '../../types';

export class RemovePlayerFromScreenCommand extends Command<PlayerItemCollisionHandler> {
  constructor(player: IPlayer, item: IItem, collison: ICollision) {
    super(new PlayerItemCollisionHandler(player, item, collison));
  }

  public override execute(): void {
    this.receiver.handlePlayerCastleDoorCollision();
  }
}
