/* eslint-disable @typescript-eslint/lines-between-class-members */
import { IUpdatable } from '../Interfaces';

export interface ISprite extends IUpdatable {
  size: Phaser.Math.Vector2;
  draw(renderTexture: Phaser.GameObjects.RenderTexture, location: Phaser.Math.Vector2): void;
}

export interface SpriteDetails {
  layerDepth: number;
  frameDelay: number;
  colorTintDelay: number;
  scale: number;
  textureName: string;
  sourceFrames: Record<string, string[]>;
  sizes: { x: number, y: number }[];
}

export class Sprite implements ISprite {
  private readonly sourceFrames: Record<string, Phaser.GameObjects.Image[]> = {};
  private readonly spriteSheet;
  private readonly spriteSizes: Phaser.Math.Vector2[] = [];
  private readonly spriteScale: number;
  private readonly spriteDepth: number;
  private readonly totalColorTints: number;
  private readonly colorTintDelay: number;
  private readonly totalFrames: number;
  private readonly frameDelay: number;

  private currentColorTint: number;
  private _colorTintDelayTimer: number;
  private currentFrame: number;
  private _frameDelayTimer: number;

  constructor(spriteDetails: SpriteDetails, scene: Phaser.Scene) {
    this.spriteSheet = spriteDetails.textureName;
    this.spriteSizes = spriteDetails.sizes.map((size) => new Phaser.Math.Vector2(size.x, size.y));
    this.spriteScale = spriteDetails.scale;
    this.spriteDepth = spriteDetails.layerDepth;
    this.frameDelay = spriteDetails.frameDelay;
    this.colorTintDelay = spriteDetails.colorTintDelay;

    const sourceFrameKeys = Object.keys(spriteDetails.sourceFrames);

    sourceFrameKeys.forEach((key) => {
      this.sourceFrames[key] = spriteDetails.sourceFrames[key].map((frame) => new Phaser.GameObjects.Image(scene, 0, 0, this.spriteSheet, frame).setScale(this.spriteScale).setDepth(this.spriteDepth));
    });

    this.totalFrames = this.sourceFrames['0'].length;
    this.totalColorTints = sourceFrameKeys.length;

    this.currentColorTint = 0;
    this._colorTintDelayTimer = 0;
    this.currentFrame = 0;
    this._frameDelayTimer = 0;
  }

  public update(time: number, delta: number) {
    this.frameDelayTimer += delta / 1000;
    this.colorTintDelayTimer += delta / 1000;
  }

  public draw(renderTexture: Phaser.GameObjects.RenderTexture, location: Phaser.Math.Vector2) {
    renderTexture.batchDraw(this.sourceFrames[this.currentColorTint.toString()][this.currentFrame], location.x, location.y);
  }

  public get size(): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(this.spriteSizes[this.currentFrame].x * this.spriteScale, this.spriteSizes[this.currentFrame].y * this.spriteScale);
  }

  private get colorTintDelayTimer(): number {
    return this._colorTintDelayTimer;
  }

  private get frameDelayTimer(): number {
    return this._frameDelayTimer;
  }

  private set colorTintDelayTimer(delta: number) {
    if (Math.round(this._colorTintDelayTimer) >= Math.round(this.colorTintDelay)) {
      this.currentColorTint = this.currentColorTint + 1 === this.totalColorTints ? 0 : this.currentColorTint + 1;
      this._colorTintDelayTimer = 0;
    } else {
      this._colorTintDelayTimer += delta;
    }
  }

  private set frameDelayTimer(delta: number) {
    if (Math.round(this._frameDelayTimer) >= Math.round(this.frameDelay)) {
      this.currentFrame = this.currentFrame + 1 === this.totalFrames ? 0 : this.currentFrame + 1;
      this._frameDelayTimer = 0;
    } else {
      this._frameDelayTimer += delta;
    }
  }
}
