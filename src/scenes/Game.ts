import Phaser from 'phaser';
import { BrickBlock } from '../game-objects/blocks/BrickBlock';
import { FloorBlock } from '../game-objects/blocks/FloorBlock';
import { HiddenBlock } from '../game-objects/blocks/HiddenBlock';
import { HorizontalGreenPipe } from '../game-objects/blocks/HorizontalGreenPipe';
import { LargeGreenPipeShaft } from '../game-objects/blocks/LargeGreenPipeShaft';
import { LargeVerticalGreenPipe } from '../game-objects/blocks/LargeVerticalGreenPipe';
import { MediumVerticalGreenPipe } from '../game-objects/blocks/MediumVerticalGreenPipe';
import { QuestionBlock } from '../game-objects/blocks/QuestionBlock';
import { SmallVerticalGreenPipe } from '../game-objects/blocks/SmallVerticalGreenPipe';
import { StairBlock } from '../game-objects/blocks/StairBlock';
import { UsedBlock } from '../game-objects/blocks/UsedBlock';
import { FireFlower } from '../game-objects/items/FireFlower';
import { Flagpole } from '../game-objects/items/Flagpole';
import { GreenMushroom } from '../game-objects/items/GreenMushroom';
import { NonSpinningCoin } from '../game-objects/items/NonSpinningCoin';
import { RedMushroom } from '../game-objects/items/RedMushroom';
import { SpinningCoin } from '../game-objects/items/SpinningCoin';
import { Star } from '../game-objects/items/Star';
import { Mario } from '../game-objects/players/Mario';
import { IPlayer } from '../game-objects/players/types';
import { IGameObject } from '../game-objects/types';
import SpriteFactory from '../graphics/SpriteFactory';
import { CrouchCommand } from '../input/commands/CrouchCommand';
import { JumpCommand } from '../input/commands/JumpCommand';
import { NullCommand } from '../input/commands/NullCommand';
import { WalkLeftCommand } from '../input/commands/WalkLeftCommand';
import { WalkRightCommand } from '../input/commands/WalkRightCommand';
import { KeyboardController } from '../input/KeyboardController';
import { IController } from '../input/types';

export default class Demo extends Phaser.Scene {
  private gameObjects: IGameObject[];
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
    this.gameObjects = [
      new Mario(new Phaser.Math.Vector2(525, 200)),

      new QuestionBlock(new Phaser.Math.Vector2(50, 300)),
      new BrickBlock(new Phaser.Math.Vector2(82, 300)),
      new FloorBlock(new Phaser.Math.Vector2(114, 300)),
      new HiddenBlock(new Phaser.Math.Vector2(146, 300)),
      new StairBlock(new Phaser.Math.Vector2(178, 300)),
      new UsedBlock(new Phaser.Math.Vector2(210, 300)),

      new HorizontalGreenPipe(new Phaser.Math.Vector2(306, 300)),
      new LargeGreenPipeShaft(new Phaser.Math.Vector2(402, 300)),
      new LargeVerticalGreenPipe(new Phaser.Math.Vector2(466, 300)),
      new MediumVerticalGreenPipe(new Phaser.Math.Vector2(498, 300)),
      new SmallVerticalGreenPipe(new Phaser.Math.Vector2(530, 300)),

      new FireFlower(new Phaser.Math.Vector2(50, 350)),
      new GreenMushroom(new Phaser.Math.Vector2(82, 350)),
      new RedMushroom(new Phaser.Math.Vector2(114, 350)),
      new NonSpinningCoin(new Phaser.Math.Vector2(146, 350)),
      new SpinningCoin(new Phaser.Math.Vector2(178, 350)),
      new Star(new Phaser.Math.Vector2(210, 350)),
      new Flagpole(new Phaser.Math.Vector2(700, 350)),
    ];

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
        keyDownCommand: new JumpCommand(this.gameObjects[0] as IPlayer),
        keyUpCommand: new NullCommand(),
        canBeHeld: true, // TODO: remove once physics implemented
      },
      {
        key: Phaser.Input.Keyboard.KeyCodes.RIGHT.toString(),
        keyDownCommand: new WalkRightCommand(this.gameObjects[0] as IPlayer),
        keyUpCommand: new NullCommand(),
        canBeHeld: true,
      },
      {
        key: Phaser.Input.Keyboard.KeyCodes.LEFT.toString(),
        keyDownCommand: new WalkLeftCommand(this.gameObjects[0] as IPlayer),
        keyUpCommand: new NullCommand(),
        canBeHeld: true,
      },
      {
        key: Phaser.Input.Keyboard.KeyCodes.DOWN.toString(),
        keyDownCommand: new CrouchCommand(this.gameObjects[0] as IPlayer),
        keyUpCommand: new NullCommand(),
        canBeHeld: true,
      }
    );
  }

  private addDelta = 0;

  update(time: number, delta: number): void {
    this.keyboardController.update();
    this.gameObjects.forEach((gameObject) => {
      gameObject.update(time, delta);
    });
    this.addDelta += delta / 1000;

    this.rt.clear();
    this.fpsText.setText(
      `FPS: ${(1000 / delta).toFixed(3)}\nDelta: ${(delta / 1000).toFixed(
        4
      )}\nTime: ${time / 1000}\nAdd Delta: ${this.addDelta}`
    );
    this.rt.beginDraw();
    this.gameObjects.forEach((gameObject) => {
      gameObject.draw(this.rt);
    });
    this.rt.endDraw();
  }
}
