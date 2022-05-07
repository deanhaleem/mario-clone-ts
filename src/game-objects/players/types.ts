import { IGameObject } from '../types';

export interface IPlayer extends IGameObject {
  jump(): void;
  walkRight(): void;
  walkLeft(): void;
  crouch(): void;
  run(): void;
}
