import { IPlayer } from '../game-objects/player/types';
import { IGameObject } from '../game-objects/types';
import { IDrawable } from '../graphics/types';
import { IUpdatable } from '../types';

export interface ILevel extends IUpdatable, IDrawable {
  player: IPlayer | undefined;
  name: string;

  loadContent(): void;
  disposeOfGameObject(gameObject: IGameObject): void;
  registerGameObject(gameObject: IGameObject): void;
  unregisterGameObject(gameObject: IGameObject): void;
  getObjectsOnScreen(levelBounds: Phaser.Geom.Rectangle): IGameObject[];
  cleanUp(levelBounds: Phaser.Geom.Rectangle): void;
  reset(): void;
}

export interface GameObjectRegistrar {
  Type: string;
  Namespace: string;
  Locations: { X: number; Y: number }[];
  WarpLocations?: { X: number; Y: number }[];
  Lengths?: { X: number; Y: number }[];
  ItemTypes?: string[];
}
