import { IUpdatable } from '../IUpdatable';

export interface ISprite extends IUpdatable {
  readonly size: Phaser.Math.Vector2;

  /**
   * Updates render information for the sprite.
   * Note: this does not actually render the sprite.
   *
   * @param location where to draw the sprite
   */
  render(location: Phaser.Math.Vector2): void;
}

export class Sprite {
  private readonly sourceFrames: Record<string, Phaser.Math.Vector4>;

  private texture: Phaser.Textures.Texture;

  public Sprite(scene: Phaser.Scene, textureName: string) {
    this.texture = scene.textures.get(textureName);
  }
}
