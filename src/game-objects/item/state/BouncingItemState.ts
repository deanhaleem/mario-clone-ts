import { physics } from '../../../utils/constants/physics';
import { IItem } from '../types';
import { ItemState } from './ItemState';

export class BouncingItemState extends ItemState {
  constructor(item: IItem) {
    super(item);

    this.item.applyImpulse(physics.bouncingItemImpulse);
    this.item.applyForce(physics.gravitationalForce);
  }

  public override land(): void {
    this.item.applyImpulse(
      physics.bouncingItemBounceImpulse.subtract(
        new Phaser.Math.Vector2(0, this.item.velocity.y)
      )
    );
  }
}
