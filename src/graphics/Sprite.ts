export interface ISprite {

}

type SpriteDetails = {
  filename: string;
  frame: { x: number, y: number, w: number, h: number };
  spriteSourceSize: { x: number, y: number, w: number, h: number };
  sourceSize: { w: number, h: number };
  pivot: { x: number, y: number };
  tint: number; // hexadecimal number
  scale: number;
  hitbox: { w: number, h: number };
};

export class Sprite implements ISprite {
  private spriteDetails: SpriteDetails;

  private sprite: Phaser.GameObjects.Image;

  private textureName: string;

  public Sprite(spriteDetails: SpriteDetails, textureName: string) {
    this.spriteDetails = spriteDetails;
    this.textureName = textureName;

    // TODO: load sprite scale, tint etc using a singleton that maintains the current scene
  }
}
