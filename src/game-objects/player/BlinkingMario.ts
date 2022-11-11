import { timers } from '../../utils/constants/timers';
import { PlayerDecorator } from './PlayerDecorator';
import { IPlayer } from './types';

export class BlinkingMario extends PlayerDecorator {
  constructor(player: IPlayer) {
    super(player, timers.blinkTimer);
  }

  public override draw(renderTexture: Phaser.GameObjects.RenderTexture): void {
    if (this.decorationTimer % 2 === 0) {
      super.draw(renderTexture);
    }
  }

  public override takeDamage(): void {}
}
