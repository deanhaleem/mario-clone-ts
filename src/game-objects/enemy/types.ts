import { IRigidBody } from '../../physics/types';
import { IGameObject } from '../types';
import { IEnemyState } from './state/types';

export interface IEnemy extends IGameObject, IRigidBody {
  enemyState: IEnemyState;

  stomp(): void;
  flip(): void;
  disarm(): void;
  wakeUp(): void;
}
