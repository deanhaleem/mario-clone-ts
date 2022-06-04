import { IUpdatable } from '../../../types';

export interface IActionState extends IUpdatable {
  spriteName: string;
  stand(): void;
  jump(): void;
  walkRight(): void;
  walkLeft(): void;
  crouch(): void;
  stopJumping(): void;
  stopMovingRight(): void;
  stopMovingLeft(): void;
  stopCrouching(): void;
}

export interface IPowerUpState extends IUpdatable {
  spriteName: string;
}
