import SpriteFactory from '../../graphics/SpriteFactory';
import { ISprite } from '../../graphics/types';
import { Directions } from '../../physics/types';
import { timers } from '../../utils/constants/timers';
import { PlayerDecorator } from './PlayerDecorator';
import { IActionState } from './state/types';
import { IPlayer } from './types';

export class StarMario extends PlayerDecorator {
  private starMarioSprite: ISprite;

  protected override spriteName = 'Mario';

  constructor(player: IPlayer) {
    super(player, timers.starTimer);

    this.starMarioSprite = SpriteFactory.instance.createSprite(
      `Star${this.decoratedPlayer.powerUpState.spriteName}${
        Directions[this.decoratedPlayer.direction]
      }${this.decoratedPlayer.actionState.spriteName}${this.spriteName}`
    );

    // SoundManager.instance.stopSong();
    // SoundManager.instance.playSong('StarMario');
  }

  public override update(time: number, delta: number): void {
    this.starMarioSprite.update(time, delta);

    super.update(time, delta);
  }

  public override draw(renderTexture: Phaser.GameObjects.RenderTexture): void {
    this.starMarioSprite.draw(renderTexture, this.decoratedPlayer.location);
  }

  public override removeDecorator(): void {
    // SoundManager.instance.stopSong();
    // SoundManager.instance.playSound('');

    super.removeDecorator();
  }

  public override set actionState(actionState: IActionState) {
    this.decoratedPlayer.actionState = actionState;
    this.starMarioSprite = SpriteFactory.instance.createSprite(
      `Star${this.decoratedPlayer.powerUpState.spriteName}${
        Directions[this.decoratedPlayer.direction]
      }${this.decoratedPlayer.actionState.spriteName}${this.spriteName}`
    );
  }

  public override takeDamage(): void {}
  public override decorate(): void {}
}
