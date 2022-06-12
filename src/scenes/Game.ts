import Phaser from 'phaser';
import { BrickBlock } from '../game-objects/block/BrickBlock';
import { FloorBlock } from '../game-objects/block/FloorBlock';
import { HiddenBlock } from '../game-objects/block/HiddenBlock';
import { HorizontalGreenPipe } from '../game-objects/block/HorizontalGreenPipe';
import { LargeGreenPipeShaft } from '../game-objects/block/LargeGreenPipeShaft';
import { LargeVerticalGreenPipe } from '../game-objects/block/LargeVerticalGreenPipe';
import { MediumVerticalGreenPipe } from '../game-objects/block/MediumVerticalGreenPipe';
import { PowerUpQuestionBlock } from '../game-objects/block/PowerUpQuestionBlock';
import { SmallVerticalGreenPipe } from '../game-objects/block/SmallVerticalGreenPipe';
import { StairBlock } from '../game-objects/block/StairBlock';
import { UsedBlock } from '../game-objects/block/UsedBlock';
import { Goomba } from '../game-objects/enemy/Goomba';
import { Koopa } from '../game-objects/enemy/Koopa';
import { FireFlower } from '../game-objects/item/FireFlower';
import { Flagpole } from '../game-objects/item/Flagpole';
import { GreenMushroom } from '../game-objects/item/GreenMushroom';
import { NonSpinningCoin } from '../game-objects/item/NonSpinningCoin';
import { RedMushroom } from '../game-objects/item/RedMushroom';
import { SpinningCoin } from '../game-objects/item/SpinningCoin';
import { Star } from '../game-objects/item/Star';
import { Mario } from '../game-objects/player/Mario';
import { IPlayer } from '../game-objects/player/types';
import { Fireball } from '../game-objects/projectile/Fireball';
import { LargeBush } from '../game-objects/scenery/LargeBush';
import { LargeCloud } from '../game-objects/scenery/LargeCloud';
import { LargeHill } from '../game-objects/scenery/LargeHill';
import { MediumBush } from '../game-objects/scenery/MediumBush';
import { MediumCloud } from '../game-objects/scenery/MediumCloud';
import { SmallBush } from '../game-objects/scenery/SmallBush';
import { SmallCastle } from '../game-objects/scenery/SmallCastle';
import { SmallCloud } from '../game-objects/scenery/SmallCloud';
import { SmallHill } from '../game-objects/scenery/SmallHill';
import { IGameObject } from '../game-objects/types';
import SpriteFactory from '../graphics/SpriteFactory';
import { CrouchCommand } from '../input/commands/CrouchCommand';
import { JumpCommand } from '../input/commands/JumpCommand';
import { StopCrouchingCommand } from '../input/commands/StopCrouchingCommand';
import { StopJumpingCommand } from '../input/commands/StopJumpingCommand';
import { StopMovingLeft } from '../input/commands/StopMovingLeftCommand';
import { StopMovingRight } from '../input/commands/StopMovingRightCommand';
import { WalkLeftCommand } from '../input/commands/WalkLeftCommand';
import { WalkRightCommand } from '../input/commands/WalkRightCommand';
import { KeyboardController } from '../input/KeyboardController';
import { IController } from '../input/types';
import { physics } from '../utils/constants/Physics';

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

      new PowerUpQuestionBlock(new Phaser.Math.Vector2(50, 300)),
      new BrickBlock(new Phaser.Math.Vector2(82, 300)),
      new FloorBlock(new Phaser.Math.Vector2(114, 300)),
      new HiddenBlock(new Phaser.Math.Vector2(146, 300)),
      new StairBlock(new Phaser.Math.Vector2(178, 300)),
      new UsedBlock(new Phaser.Math.Vector2(210, 300)),

      new HorizontalGreenPipe(new Phaser.Math.Vector2(100, 375)),
      new LargeGreenPipeShaft(new Phaser.Math.Vector2(200, 375)),
      new LargeVerticalGreenPipe(new Phaser.Math.Vector2(280, 375)),
      new MediumVerticalGreenPipe(new Phaser.Math.Vector2(350, 375)),
      new SmallVerticalGreenPipe(new Phaser.Math.Vector2(280, 245)),
      // new LargeVerticalGreenPipe(new Phaser.Math.Vector2(466, 300)),
      // new MediumVerticalGreenPipe(new Phaser.Math.Vector2(498, 300)),
      // new SmallVerticalGreenPipe(new Phaser.Math.Vector2(530, 300)),

      new FireFlower(new Phaser.Math.Vector2(50, 250)),
      new GreenMushroom(new Phaser.Math.Vector2(82, 250)),
      new RedMushroom(new Phaser.Math.Vector2(114, 250)),
      new NonSpinningCoin(new Phaser.Math.Vector2(146, 250)),
      new SpinningCoin(new Phaser.Math.Vector2(178, 250)),
      new Star(new Phaser.Math.Vector2(210, 250)),
      new Flagpole(new Phaser.Math.Vector2(700, 350)),

      new LargeBush(new Phaser.Math.Vector2(75, 50)),
      new MediumBush(new Phaser.Math.Vector2(190, 50)),
      new SmallBush(new Phaser.Math.Vector2(275, 50)),
      new LargeCloud(new Phaser.Math.Vector2(75, 100)),
      new MediumCloud(new Phaser.Math.Vector2(190, 100)),
      new SmallCloud(new Phaser.Math.Vector2(275, 100)),
      new LargeHill(new Phaser.Math.Vector2(100, 175)),
      new SmallHill(new Phaser.Math.Vector2(250, 175)),
      new SmallCastle(new Phaser.Math.Vector2(475, 375)),

      new Goomba(new Phaser.Math.Vector2(425, 200)),
      new Koopa(new Phaser.Math.Vector2(475, 200)),

      new Fireball(
        new Phaser.Math.Vector2(390, 200),
        physics.rightProjectileVelocity
      ),
    ];

    // this.fpsText = this.add.text(10, 10, 'FPS: -- \n-- Particles', {
    //   font: 'bold 26px Arial',
    // });

    this.input.keyboard.addKey('Z');
    this.input.keyboard.addKey('RIGHT');
    this.input.keyboard.addKey('LEFT');
    this.input.keyboard.addKey('DOWN');

    this.keyboardController = new KeyboardController(
      this.input.keyboard,
      {
        key: Phaser.Input.Keyboard.KeyCodes.Z.toString(),
        keyDownCommand: new JumpCommand(this.gameObjects[0] as IPlayer),
        keyUpCommand: new StopJumpingCommand(this.gameObjects[0] as IPlayer),
        canBeHeld: true, // TODO: remove once physics implemented
      },
      {
        key: Phaser.Input.Keyboard.KeyCodes.RIGHT.toString(),
        keyDownCommand: new WalkRightCommand(this.gameObjects[0] as IPlayer),
        keyUpCommand: new StopMovingRight(this.gameObjects[0] as IPlayer),
        canBeHeld: true,
      },
      {
        key: Phaser.Input.Keyboard.KeyCodes.LEFT.toString(),
        keyDownCommand: new WalkLeftCommand(this.gameObjects[0] as IPlayer),
        keyUpCommand: new StopMovingLeft(this.gameObjects[0] as IPlayer),
        canBeHeld: true,
      },
      {
        key: Phaser.Input.Keyboard.KeyCodes.DOWN.toString(),
        keyDownCommand: new CrouchCommand(this.gameObjects[0] as IPlayer),
        keyUpCommand: new StopCrouchingCommand(this.gameObjects[0] as IPlayer),
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
    // this.fpsText.setText(
    //   `FPS: ${(1000 / delta).toFixed(3)}\nDelta: ${(delta / 1000).toFixed(
    //     4
    //   )}\nTime: ${time / 1000}\nAdd Delta: ${this.addDelta}`
    // );
    this.rt.beginDraw();
    this.gameObjects.forEach((gameObject) => {
      gameObject.draw(this.rt);
    });
    this.rt.endDraw();
  }
}
