import SpriteFactory from '../graphics/SpriteFactory';
import { ISprite } from '../graphics/types';
import { IGameObject } from './types';

export abstract class GameObject implements IGameObject {
  private gameObjectSprite: ISprite;

  protected abstract spriteName: string;

  public location: Phaser.Math.Vector2;

  protected constructor(location: Phaser.Math.Vector2) {
    this.location = location;
  }

  public update(time: number, delta: number): void {
    this.gameObjectSprite.update(time, delta);
  }

  public draw(renderTexture: Phaser.GameObjects.RenderTexture): void {
    this.gameObjectSprite.draw(renderTexture, this.location);
  }

  public setSprite(spriteName: string): void {
    this.gameObjectSprite = SpriteFactory.instance.createSprite(spriteName);
  }
}
