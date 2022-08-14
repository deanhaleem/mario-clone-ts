import SpriteFactory from '../graphics/SpriteFactory';
import { ISprite } from '../graphics/types';
import getCurrentScene from '../scenes/Scene';
import { locations } from '../utils/constants/Locations';
import { offsets } from '../utils/constants/Offsets';
import { strings } from '../utils/constants/String';
import { IHud } from './types';

export class Hud implements IHud {
  private readonly coinSprite: ISprite;
  private readonly crossSprite: ISprite;
  private readonly screenSize: Phaser.Math.Vector2;

  private scoreText: Phaser.GameObjects.Text;
  private coinsText: Phaser.GameObjects.Text;
  private levelText: Phaser.GameObjects.Text;
  private timeText: Phaser.GameObjects.Text;

  constructor(screenSize: Phaser.Math.Vector2) {
    this.screenSize = screenSize;

    this.coinSprite = SpriteFactory.instance.createSprite('NonSpinningCoin');
    this.crossSprite = SpriteFactory.instance.createSprite('Cross');

    getCurrentScene().add.text(
      locations.playerHud.x,
      locations.playerHud.y,
      strings.playerHudName,
      { fontFamily: 'Emulogic' }
    );
    getCurrentScene().add.text(
      screenSize.x / 2 + offsets.worldHud.x,
      0,
      strings.gameWorldName,
      { fontFamily: 'Emulogic' }
    );
    getCurrentScene().add.text(
      (3 * screenSize.x) / 4 + offsets.timeHud.x,
      0,
      strings.gameTimeName,
      { fontFamily: 'Emulogic' }
    );

    this.scoreText = getCurrentScene().add.text(
      locations.scoreHud.x,
      locations.scoreHud.y,
      '000000', //StateManger.instance.score.toFixed(strings.scoreDigits)
      { fontFamily: 'Emulogic' }
    );
    this.coinsText = getCurrentScene().add.text(
      screenSize.x / 4 + offsets.coinCountHud.x,
      offsets.coinCountHud.y,
      '00', //StateManger.instance.coins.toFixed(strings.coinsDigits)
      { fontFamily: 'Emulogic' }
    );
    this.levelText = getCurrentScene().add.text(
      screenSize.x / 2 + offsets.levelNameHud.x,
      offsets.levelNameHud.y,
      'Name', //Game1.instance.levelName
      { fontFamily: 'Emulogic' }
    );
    this.timeText = getCurrentScene().add.text(
      (3 * screenSize.x) / 4 + offsets.timeLeftHud.x,
      offsets.timeLeftHud.y,
      '00000', //StateManger.instance.time.toFixed(strings.timeDigits)
      { fontFamily: 'Emulogic' }
    );
  }

  public update(time: number, delta: number): void {
    this.coinSprite.update(time, delta);
  }

  public draw(renderTexture: Phaser.GameObjects.RenderTexture): void {
    this.scoreText.setText(
      '000000' //StateManger.instance.score.toFixed(strings.scoreDigits)
    );
    this.coinSprite.draw(
      renderTexture,
      new Phaser.Math.Vector2(
        this.screenSize.x / 4 + offsets.coinCountHud.x,
        offsets.coinCountHud.y
      )
    );
    this.crossSprite.draw(
      renderTexture,
      new Phaser.Math.Vector2(
        this.screenSize.x / 4 + offsets.crossHud.x,
        offsets.crossHud.y
      )
    );
    this.coinsText.setText(
      '00' //StateManger.instance.coins.toFixed(strings.coinsDigits)
    );
    this.levelText.setText(
      'Name' //Game1.instance.levelName
    );
    this.timeText.setText(
      '00000' //StateManger.instance.time.toFixed(strings.timeDigits)
    );
  }
}
