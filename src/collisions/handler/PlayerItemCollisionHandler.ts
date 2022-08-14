import { IItem } from '../../game-objects/item/types';
import { PlayerDecorator } from '../../game-objects/player/PlayerDecorator';
import { IPlayer } from '../../game-objects/player/types';
import { physics } from '../../utils/constants/Physics';
import { ICollision } from '../types';

export class PlayerItemCollisionHandler {
  private readonly player: IPlayer;
  private readonly item: IItem;
  private readonly collision: ICollision;

  constructor(player: IPlayer, item: IItem, collision: ICollision) {
    this.player = player;
    this.item = item;
    this.collision = collision;
  }

  public handlePlayerFireFlowerCollision() {
    this.player.upgrade();
    // Game1.instance.disposeOfObject(item);

    // StatManager.instance.gainPoints(this.collision.intersection, 'handlePlayerFireFlowerCollision')
  }

  public handlePlayerGreenMushroomCollision() {
    // Game1.instance.disposeOfObject(item);
    // StatManager.instance.gainPoints(this.collision.intersection, 'handlePlayerGreenMushroomCollision')
    // StatManager.instance.GainOrLoseLife(true)
    // SoundManager.instance.playSoundEffect('handlePlayerGreenMushroomCollision')
  }

  public handlePlayerRedMushroomCollision() {
    this.player.upgrade();
    // Game1.instance.disposeOfObject(item);

    // StatManager.instance.gainPoints(this.collision.intersection, 'handlePlayerRedMushroomCollision')
  }

  public handlePlayerNonSpinningCoinCollision() {
    // Game1.instance.disposeOfObject(item);
    // StatManager.instance.gainPoints(this.collision.intersection, 'handlePlayerNonSpinningCoinCollision')
    // StatManager.instance.GainCoin()
    // SoundManager.instance.playSoundEffect('handlePlayerNonSpinningCoinCollision')
  }

  public handlePlayerStarCollision() {
    // Game1.instance.player = new StarMario(player);
    this.player.decorate();
    // Game1.instance.disposeOfObject(this.item);

    // StatManager.instance.gainPoints(this.collision.intersection, 'handlePlayerStarCollision')
  }

  public handleNonUpgradingPplayerPowerUpCollision() {
    // Game1.instance.disposeOfObject(this.item);
    // StatManager.instance.gainPoints(this.)
  }

  public handleBlinkingPlayerRedMushroomCollision() {
    (this.player as PlayerDecorator)?.removeDecorator();
    this.player.upgrade();
    // Game1.instance.disposeOfObject(this.item)

    // StatManager.instance.gainPoints(this.collision.intersection, 'handleBlinkingPlayerRedMushroomCollision')
  }

  public handleBlinkingPlayerFireFlowerCollision() {
    (this.player as PlayerDecorator)?.removeDecorator();
    this.player.upgrade();
    // Game1.instance.disposeOfObject(this.item)

    // StatManager.instance.gainPoints(this.collision.intersection, 'handleBlinkingPlayerFireFlowerCollision')
  }

  public handleBlinkingPlayerStarCollision() {
    (this.player as PlayerDecorator)?.removeDecorator();
    // Game1.instance.player = new StarMario(player);
    this.player.upgrade();
    // Game1.instance.disposeOfObject(this.item)

    // StatManager.instance.gainPoints(this.collision.intersection, 'handleBlinkingPlayerStarCollision')
  }

  public handlePlayerFlagpoleCollision() {
    // if (Game1.instance.gameState.constructor.name !== 'VictoryGameState')

    (this.player as PlayerDecorator)?.removeDecorator();
    this.player.winLevel();
    this.player.applyImpulse(physics.slideDownFlagImpulse);
    this.item.fall();
    // Game1.instance.endLevel();

    // StatManager.instance.gainPoints(this.collision.intersection, 'handlePlayerFlagpoleCollision')
  }

  public handlePlayerCastleDoorCollision() {
    this.player.location = new Phaser.Math.Vector2(
      this.player.location.x,
      -this.player.location.y
    );
    this.player.winLevel();
    // Game1.instance.tallyUp();
  }
}
