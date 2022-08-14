import Phaser from 'phaser';
import { CollisionManager } from '../collisions/CollisionManager';
import { ICollisionManager } from '../collisions/types';
import { Camera } from '../display/Camera';
import { CameraController } from '../display/CameraController';
import { ICamera, ICameraController } from '../display/types';
import { IPlayer } from '../game-objects/player/types';
import SpriteFactory from '../graphics/SpriteFactory';
import { AttackCommand } from '../input/commands/AttackCommand';
import { CrouchCommand } from '../input/commands/CrouchCommand';
import { JumpCommand } from '../input/commands/JumpCommand';
import { NullCommand } from '../input/commands/NullCommand';
import { RunCommand } from '../input/commands/RunCommand';
import { StopCrouchingCommand } from '../input/commands/StopCrouchingCommand';
import { StopJumpingCommand } from '../input/commands/StopJumpingCommand';
import { StopMovingLeft } from '../input/commands/StopMovingLeftCommand';
import { StopMovingRight } from '../input/commands/StopMovingRightCommand';
import { StopRunningCommand } from '../input/commands/StopRunningCommand';
import { WalkLeftCommand } from '../input/commands/WalkLeftCommand';
import { WalkRightCommand } from '../input/commands/WalkRightCommand';
import { KeyboardController } from '../input/KeyboardController';
import { IController } from '../input/types';
import { Level } from '../level/Level';
import { ILevel } from '../level/types';
import { TimedActionManager } from '../TimedActionManager';

export default class Demo extends Phaser.Scene {
  private keyboardController: IController;
  private fpsText;

  private rt: Phaser.GameObjects.RenderTexture;

  private level: ILevel;
  private collisionManager: ICollisionManager;
  public camera: ICamera;
  public cameraController: ICameraController;

  public get player() {
    return this.level.player as IPlayer;
  }

  public set player(player: IPlayer) {
    this.level.player = player;
  }

  constructor() {
    super('GameScene');
  }

  preload() {
    SpriteFactory.instance.loadContent(this);
    this.level = new Level();
    this.level.loadContent();
  }

  create() {
    this.fpsText = this.add.text(10, 10, 'FPS: -- \n-- Particles', {
      font: 'bold 26px Arial',
    });

    this.rt = this.add.renderTexture(0, 0, 800, 480);
    this.hardReset();
    this.cameraController = new CameraController(this.camera);

    this.input.keyboard.addKey('Z');
    this.input.keyboard.addKey('RIGHT');
    this.input.keyboard.addKey('LEFT');
    this.input.keyboard.addKey('DOWN');

    this.keyboardController = new KeyboardController(
      this.input.keyboard,
      {
        key: Phaser.Input.Keyboard.KeyCodes.Z.toString(),
        keyDownCommand: new JumpCommand(this.player),
        keyUpCommand: new StopJumpingCommand(this.player),
        canBeHeld: false,
      },
      {
        key: Phaser.Input.Keyboard.KeyCodes.RIGHT.toString(),
        keyDownCommand: new WalkRightCommand(this.player),
        keyUpCommand: new StopMovingRight(this.player),
        canBeHeld: true,
      },
      {
        key: Phaser.Input.Keyboard.KeyCodes.LEFT.toString(),
        keyDownCommand: new WalkLeftCommand(this.player),
        keyUpCommand: new StopMovingLeft(this.player),
        canBeHeld: true,
      },
      {
        key: Phaser.Input.Keyboard.KeyCodes.DOWN.toString(),
        keyDownCommand: new CrouchCommand(this.player),
        keyUpCommand: new StopCrouchingCommand(this.player),
        canBeHeld: true,
      },
      {
        key: Phaser.Input.Keyboard.KeyCodes.X.toString(),
        keyDownCommand: new RunCommand(this.player),
        keyUpCommand: new StopRunningCommand(this.player),
        canBeHeld: true,
      },
      {
        key: Phaser.Input.Keyboard.KeyCodes.C.toString(),
        keyDownCommand: new AttackCommand(this.player),
        keyUpCommand: new NullCommand(),
        canBeHeld: false,
      }
    );
  }
  private addDelta = 0;
  update(time: number, delta: number): void {
    this.keyboardController.update();
    this.level.update(time, delta);
    TimedActionManager.instance.update(time, delta);
    // this.cameraController.update(time, delta);
    this.addDelta += delta / 1000;

    this.collisionManager.update(this.camera);

    // this.level.cleanUp(this.camera.hitbox);

    this.rt.clear();
    this.fpsText.setText(
      `Time: ${time / 1000}\nAccel: ${this.player.acceleration.x},${
        this.player.acceleration.y
      }\nVel: ${this.player.velocity.x},${this.player.velocity.y}`
    );
    this.rt.beginDraw();
    this.level.draw(this.rt);
    this.rt.endDraw();
  }

  hardReset() {
    this.level.reset();
    this.collisionManager = new CollisionManager(this.level);
    this.camera = new Camera(
      new Phaser.Math.Vector2(),
      new Phaser.Math.Vector2(800, 480)
    );
  }
}
