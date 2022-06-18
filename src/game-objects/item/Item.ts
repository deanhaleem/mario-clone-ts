import { Directions } from '../../physics/types';
import { physics } from '../../utils/constants/Physics';
import { KinematicGameObject } from '../KinematicGameObject';
import { IItemState } from './state/types';
import { IItem } from './types';

export abstract class Item extends KinematicGameObject implements IItem {
  public itemState: IItemState;

  protected constructor(location: Phaser.Math.Vector2) {
    super(location, physics.maxItemVelocity);

    super.direction = Directions.Right;
  }

  public override update(time: number, delta: number): void {
    this.itemState.update(time, delta);

    super.update(time, delta);
  }
}
