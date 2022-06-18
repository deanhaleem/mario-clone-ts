import { IDrawable } from '../graphics/types';
import { ICollidable } from '../physics/types';
import { IUpdatable } from '../types';

export interface IGameObject extends IUpdatable, IDrawable, ICollidable {
  /**
   * The location at which the Game Object appears on then screen.
   */
  location: Phaser.Math.Vector2;

  /**
   * Set the current sprite of the Game Object.
   */
  setSprite(spriteName: string): void;
}
