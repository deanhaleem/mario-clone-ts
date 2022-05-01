import { getCurrentScene } from "..";

export interface ISprite {

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
};

export class Sprite implements ISprite {
  // TODO: maintain an array of images?
  private image: Phaser.GameObjects.Image;
  private readonly images: Phaser.GameObjects.Image[] = [];
  private spriteDetails: SpriteDetails;

  private currentFrame: number;
  private temp: number;

  private textureName: string;

  constructor(spriteDetails: SpriteDetails, textureName: string) {
    this.spriteDetails = spriteDetails;
    this.textureName = textureName;
    this.currentFrame = 0;
    this.temp = 0;

    this.image = new Phaser.GameObjects.Image(getCurrentScene(), 0, 0, textureName, spriteDetails.filename);
    this.image.setScale(spriteDetails.scale);
    this.image.setDepth(spriteDetails.layerDepth);
    console.log(this.spriteDetails.frameDelay)

    this.images.push(
      new Phaser.GameObjects.Image(getCurrentScene(), 0, 0, textureName, spriteDetails.filename),
      new Phaser.GameObjects.Image(getCurrentScene(), 0, 0, textureName, 'BigRightWalkingMario-1-0'),
      new Phaser.GameObjects.Image(getCurrentScene(), 0, 0, textureName, 'BigRightWalkingMario-2-0')
    )
  }

  public update() {
    if (this.temp >= 60) {
      this.currentFrame++;
      this.temp = 0;
    }

    this.temp++;
   

    if (this.currentFrame >= this.images.length) {
      this.currentFrame = 0;
    }
  }

  public draw(rt: Phaser.GameObjects.RenderTexture) {
    rt.batchDraw(this.images[this.currentFrame], 525, 200)
  }
}
