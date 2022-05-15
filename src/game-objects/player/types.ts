import { IUpdatable } from '../../types';
import { IGameObject } from '../types';

export interface IPlayer extends IGameObject {
  powerUpState: IPowerUpState;
  actionState: IActionState;

  /**
   * Move the player upwards by 2 units.
   */
  jump(): void;

  /**
   * Move the player right by 2 units.
   */
  walkRight(): void;

  /**
   * Move the player left by 2 units.
   */
  walkLeft(): void;

  /**
   * Move the player down by 2 units.
   */
  crouch(): void;

  run(): void;
  stopJumping(): void;
  stopMovingRight(): void;
  stopMovingLeft(): void;
  stopCrouching(): void;
}
