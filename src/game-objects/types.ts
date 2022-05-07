import { IDrawable } from '../graphics/types';
import { IUpdatable } from '../types';

export interface IGameObject extends IUpdatable, IDrawable {
  location: Phaser.Math.Vector2;

  setSprite(spriteName: string): void;
}
