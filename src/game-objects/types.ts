import { IDrawable } from '../graphics/types';
import { IUpdatable } from '../types';

export interface IGameObject extends IUpdatable, IDrawable {
  /**
   * The location of the Game Object on the screen.
   */
  location: Phaser.Math.Vector2;

  /**
   * Set the current sprite of the Game Object.
   */
  setSprite(spriteName: string): void;
}
