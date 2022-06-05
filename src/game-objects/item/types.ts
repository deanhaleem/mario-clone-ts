import { IRigidBody } from '../../physics/types';
import { IGameObject } from '../types';
import { IItemState } from './state/types';

export interface IItem extends IGameObject, IRigidBody {
  itemState: IItemState;
}
