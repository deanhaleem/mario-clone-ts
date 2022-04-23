import { IUpdatable } from '../IUpdatable';

export interface IPlayer extends IUpdatable {
  walkRight(): void;
}

export abstract class Player implements IPlayer {
  public walkRight(): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(time: number, delta: number): void {}
}
