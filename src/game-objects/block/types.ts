import { Constructor } from '../../types';
import { IItem } from '../item/types';
import { IGameObject } from '../types';
import { IBlockState } from './state/types';

export interface IBlock extends IGameObject {
  blockState: IBlockState;
  bump(): void;
  destroy(): void;
}

export interface IItemContainer extends IBlock {
  itemType: Constructor<IItem>;
}

export interface IPipe extends IBlock {
  warpLocation: Phaser.Math.Vector2;
  warpHitbox: Phaser.Geom.Rectangle;
}
