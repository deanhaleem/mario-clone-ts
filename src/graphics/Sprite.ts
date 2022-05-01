import { IUpdatable } from '../Interfaces';

export interface ISprite extends IUpdatable {
  size: Phaser.Math.Vector2;
  draw(renderTexture: Phaser.GameObjects.RenderTexture, location: Phaser.Math.Vector2): void;
}

export interface SpriteDetails {
  filename: string;
  frame: { x: number, y: number, w: number, h: number };
  spriteSourceSize: { x: number, y: number, w: number, h: number };
  sourceSize: { w: number, h: number };
  pivot: { x: number, y: number };
  hitbox: { w: number, h: number };
  layerDepth: number;
  frameDelay: number;
  colorTintDelay: number;
  scale: number;
  tint: number; // hexadecimal number
}

export class Sprite implements ISprite {
  private readonly sourceFrames: Phaser.GameObjects.Image[] = [];

  private readonly spriteSizes: Phaser.Math.Vector2[] = [];

  private readonly spriteScale: number;

  private readonly spriteDepth: number;

  private readonly totalColorTints: number;

  private readonly colorTintDelay: number;

  private readonly totalFrames: number;

  private readonly frameDelay: number;

  private _currentColorTint: number;

  private colorTintDelayTimer: number;

  private currentFrame: number;

  private _frameDelayTimer: number;

  constructor(spriteDetails: SpriteDetails, textureName: string, scene: Phaser.Scene) {
    this.spriteSizes = [
      new Phaser.Math.Vector2(spriteDetails.hitbox.w, spriteDetails.hitbox.h),
    ];
    this.spriteScale = spriteDetails.scale;
    this.spriteDepth = spriteDetails.layerDepth;
    this.frameDelay = spriteDetails.frameDelay;
    this.colorTintDelay = spriteDetails.colorTintDelay;

    this.sourceFrames = [
      new Phaser.GameObjects.Image(scene, 0, 0, textureName, spriteDetails.filename).setScale(this.spriteScale).setDepth(this.spriteDepth),
      new Phaser.GameObjects.Image(scene, 0, 0, textureName, 'BigRightWalkingMario-1-0').setScale(this.spriteScale).setDepth(this.spriteDepth),
      new Phaser.GameObjects.Image(scene, 0, 0, textureName, 'BigRightWalkingMario-2-0').setScale(this.spriteScale).setDepth(this.spriteDepth),
    ];

    this.totalFrames = this.sourceFrames.length;
    this.totalColorTints = this.sourceFrames.length;

    this._currentColorTint = 0;
    this.colorTintDelayTimer = 0;
    this.currentFrame = 0;
    this._frameDelayTimer = 0;
  }

  public update(time: number, delta: number) {
    this.frameDelayTimer += delta / 1000;
    this.currentColorTint++;
  }

  public draw(renderTexture: Phaser.GameObjects.RenderTexture, location: Phaser.Math.Vector2) {
    renderTexture.batchDraw(this.sourceFrames[this.currentFrame], location.x, location.y);
  }

  public get size(): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(this.spriteSizes[this.currentFrame].x * this.spriteScale, this.spriteSizes[this.currentFrame].y * this.spriteScale);
  }

  private get currentColorTint(): number {
    return this._currentColorTint;
  }

  private get frameDelayTimer(): number {
    return this._frameDelayTimer;
  }

  private set currentColorTint(color: number) {
    // TODO: convert to using delta
    if (this.colorTintDelayTimer % this.colorTintDelay === 0) {
      this._currentColorTint = color === this.totalColorTints ? 0 : color;
    }
    this.colorTintDelayTimer++;
  }

  private set frameDelayTimer(delta: number) {
    if (this._frameDelayTimer >= Math.round(this.frameDelay)) {
      this.currentFrame = this.currentFrame + 1 === this.totalFrames ? 0 : this.currentFrame + 1;
      this._frameDelayTimer = 0;
    } else {
      this._frameDelayTimer += delta;
    }
  }
}
