import { IEnemy } from '../../../game-objects/enemy/types';
import { IPlayer } from '../../../game-objects/player/types';
import { Command } from '../../../input/commands/Command';
import { PlayerEnemyCollisionHandler } from '../../handler/PlayerEnemyCollisionHandler';
import { ICollision } from '../../types';

export class PushLeftOrDamagePlayerCommand extends Command<PlayerEnemyCollisionHandler> {
  constructor(player: IPlayer, enemy: IEnemy, collision: ICollision) {
    super(new PlayerEnemyCollisionHandler(player, enemy, collision));
  }

  public override execute(): void {
    this.receiver.handleRightPlayerShellCollision();
  }
}
