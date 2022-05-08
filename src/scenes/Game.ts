import Phaser from 'phaser';
import { Mario } from '../game-objects/players/Mario';
import { IPlayer } from '../game-objects/players/types';
import SpriteFactory from '../graphics/SpriteFactory';
import { CrouchCommand } from '../input/commands/CrouchCommand';
import { JumpCommand } from '../input/commands/JumpCommand';
import { NullCommand } from '../input/commands/NullCommand';
import { WalkLeftCommand } from '../input/commands/WalkLeftCommand';
import { WalkRightCommand } from '../input/commands/WalkRightCommand';
import { KeyboardController } from '../input/KeyboardController';
import { IController } from '../input/types';

export default class Demo extends Phaser.Scene {
  private gameObject: IPlayer;
  private keyboardController: IController;

  private rt: Phaser.GameObjects.RenderTexture;

  private fpsText;

  constructor() {
    super('GameScene');
  }

  preload() {
    SpriteFactory.instance.loadContent(this);
  }

  create() {
    this.rt = this.add.renderTexture(0, 0, 800, 480);
    this.gameObject = new Mario(new Phaser.Math.Vector2(525, 200));

    this.fpsText = this.add.text(10, 10, 'FPS: -- \n-- Particles', {
      font: 'bold 26px Arial',
    });

    this.input.keyboard.addKey('Z');
    this.input.keyboard.addKey('RIGHT');
    this.input.keyboard.addKey('LEFT');
    this.input.keyboard.addKey('DOWN');

    this.keyboardController = new KeyboardController(
      this.input.keyboard,
      {
        key: Phaser.Input.Keyboard.KeyCodes.Z.toString(),
        keyDownCommand: new JumpCommand(this.gameObject),
        keyUpCommand: new NullCommand(),
        canBeHeld: true, // TODO: remove once physics implemented
      },
      {
        key: Phaser.Input.Keyboard.KeyCodes.RIGHT.toString(),
        keyDownCommand: new WalkRightCommand(this.gameObject),
        keyUpCommand: new NullCommand(),
        canBeHeld: true,
      },
      {
        key: Phaser.Input.Keyboard.KeyCodes.LEFT.toString(),
        keyDownCommand: new WalkLeftCommand(this.gameObject),
        keyUpCommand: new NullCommand(),
        canBeHeld: true,
      },
      {
        key: Phaser.Input.Keyboard.KeyCodes.DOWN.toString(),
        keyDownCommand: new CrouchCommand(this.gameObject),
        keyUpCommand: new NullCommand(),
        canBeHeld: true,
      }
    );
  }

  private addDelta = 0;

  update(time: number, delta: number): void {
    this.keyboardController.update();
    this.gameObject.update(time, delta);
    this.addDelta += delta / 1000;

    this.rt.clear();
    this.fpsText.setText(
      `FPS: ${(1000 / delta).toFixed(3)}\nDelta: ${(delta / 1000).toFixed(
        4
      )}\nTime: ${time / 1000}\nAdd Delta: ${this.addDelta}`
    );
    this.rt.beginDraw();
    this.gameObject.draw(this.rt);
    this.rt.endDraw();
  }
}
