import { IRigidBody } from '../../physics/types';
import { IGameObject } from '../types';
import { IProjectileState } from './state/types';

export interface IProjectile extends IGameObject, IRigidBody {
  projectileState: IProjectileState;
  destroy(): void;
}
