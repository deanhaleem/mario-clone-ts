import Phaser from 'phaser';
import { manageCollisions } from '../collisions/collisions';
import { Camera } from '../display/Camera';
import { CameraController } from '../display/CameraController';
import { ICamera, ICameraController } from '../display/types';
import { IPlayer } from '../game-objects/player/types';
import { KeyboardController } from '../input/KeyboardController';
import { IController } from '../input/types';
import { Level } from '../level/Level';
import { ILevel } from '../level/types';
import { progressTimedActions } from '../TimedActionManager';

export default class Demo extends Phaser.Scene {
  private keyboardController: IController;
  private fpsText;

  private rt: Phaser.GameObjects.RenderTexture;

  private level: ILevel;
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
    this.load.atlas(
      'mario',
      'assets/sprite-sheets/mario.png',
      'assets/atlas/mario-atlas.json'
    );

    this.load.atlas(
      'blocks',
      'assets/sprite-sheets/blocksp-pipes.png',
      'assets/atlas/block-atlas.json'
    );

    this.load.atlas(
      'enemies',
      'assets/sprite-sheets/enemies.png',
      'assets/atlas/enemy-atlas.json'
    );

    this.load.atlas(
      'items',
      'assets/sprite-sheets/Items-Projectiles.png',
      'assets/atlas/item-atlas.json'
    );

    this.load.atlas(
      'misc',
      'assets/sprite-sheets/Items-Extras.png',
      'assets/atlas/misc-atlas.json'
    );

    this.load.atlas(
      'scenery',
      'assets/sprite-sheets/background-pipes.png',
      'assets/atlas/scenery-atlas.json'
    );
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
        keyDownCommand: () => this.player.jump,
        keyUpCommand: () => this.player.stopJumping,
        canBeHeld: false,
      },
      {
        key: Phaser.Input.Keyboard.KeyCodes.RIGHT.toString(),
        keyDownCommand: () => this.player.walkRight,
        keyUpCommand: () => this.player.stopMovingRight,
        canBeHeld: true,
      },
      {
        key: Phaser.Input.Keyboard.KeyCodes.LEFT.toString(),
        keyDownCommand: () => this.player.walkLeft,
        keyUpCommand: () => this.player.stopMovingLeft,
        canBeHeld: true,
      },
      {
        key: Phaser.Input.Keyboard.KeyCodes.DOWN.toString(),
        keyDownCommand: () => this.player.crouch,
        keyUpCommand: () => this.player.stopCrouching,
        canBeHeld: true,
      },
      {
        key: Phaser.Input.Keyboard.KeyCodes.X.toString(),
        keyDownCommand: () => this.player.run,
        keyUpCommand: () => this.player.stopRunning,
        canBeHeld: true,
      },
      {
        key: Phaser.Input.Keyboard.KeyCodes.C.toString(),
        keyDownCommand: () => this.player.attack,
        keyUpCommand: () => {},
        canBeHeld: false,
      }
    );
  }
  private addDelta = 0;
  update(time: number, delta: number): void {
    this.keyboardController.update();
    this.level.update(time, delta);
    progressTimedActions(time, delta);
    // this.cameraController.update(time, delta);
    this.addDelta += delta / 1000;

    manageCollisions(this.camera, this.level);

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
    this.camera = new Camera(
      new Phaser.Math.Vector2(),
      new Phaser.Math.Vector2(800, 480)
    );
  }
}
