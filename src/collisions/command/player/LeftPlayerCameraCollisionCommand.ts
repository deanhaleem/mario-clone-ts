import { IPlayer } from '../../../game-objects/player/types';
import { Command } from '../../../input/commands/Command';
import { PlayerCameraCollisionHandler } from '../../handler/PlayerCameraCollisionHandler';
import { ICollision } from '../../types';

export class LeftPlayerCameraCollisionCommand extends Command<PlayerCameraCollisionHandler> {
  constructor(player: IPlayer, collision: ICollision) {
    super(new PlayerCameraCollisionHandler(player, collision));
  }

  public override execute(): void {
    this.receiver.handleLeftPlayerCameraCollision();
  }
}
