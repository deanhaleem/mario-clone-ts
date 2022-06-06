import { IUpdatable } from '../../../types';

export interface IEnemyState extends IUpdatable {
  spriteName: string;

  changeDirection(): void;
  stomp(): void;
  flip(): void;
  disarm(): void;
  wakeUp(): void;
}
