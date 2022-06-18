import { Item } from './Item';
import { IdleItemState } from './state/IdleItemState';

export class CastleDoor extends Item {
  constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
    super.itemState = new IdleItemState(this);
  }

  protected override get spriteName() {
    return 'HiddenBlock';
  }
}
