import SpriteFactory from '../graphics/SpriteFactory';
import { ISprite } from '../graphics/types';
import { IGameObject } from './types';

export abstract class GameObject implements IGameObject {
  private gameObjectSprite: ISprite;
  private _location: Phaser.Math.Vector2;

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

  protected get spriteName() {
    return this.constructor.name;
  }

  public get hitbox(): Phaser.Geom.Rectangle {
    return new Phaser.Geom.Rectangle(
      this.location.x - this.gameObjectSprite.size.x / 2,
      this.location.y - this.gameObjectSprite.size.y,
      this.gameObjectSprite.size.x,
      this.gameObjectSprite.size.y
    );
  }

  public get location() {
    return this._location;
  }

  public set location(location: Phaser.Math.Vector2) {
    this._location = location;
  }
}
