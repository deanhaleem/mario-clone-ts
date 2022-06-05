import { IGameObject } from '../types';
import { IBlockState } from './state/types';

export interface IBlock extends IGameObject {
  blockState: IBlockState;
}

export type IItemContainer = IBlock; // TODO: itemType: ConstructorFunction

export interface IPipe extends IBlock {
  warpLocation: Phaser.Math.Vector2;
  // warpHitbox: Phaser.Geom.Rectangle;
}
