import { Item } from './Item';
import { SpawningItemState } from './state/SpawningItemState';

export abstract class SpawningItem extends Item {
  protected constructor(location: Phaser.Math.Vector2) {
    super(location);
    // TODO: spawning item type

    super.itemState = new SpawningItemState(this);
  }
}
