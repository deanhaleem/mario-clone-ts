import { IUpdatable } from '../../../types';

export interface IProjectileState extends IUpdatable {
  destroy(): void;
  land(): void;
}
