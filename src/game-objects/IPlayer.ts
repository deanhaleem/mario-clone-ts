import { IUpdatable } from '../types';

export interface IPlayer extends IUpdatable {
  walkRight(): void;
}

export abstract class Player implements IPlayer {
  public walkRight(): void {}

  public update(time: number, delta: number): void {}
}
