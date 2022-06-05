import { Item } from './Item';
import { IdleItemState } from './state/IdleItemState';

export class CastleDoor extends Item {
  protected override spriteName = 'HiddenBlock';

  constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
    super.itemState = new IdleItemState(this);
  }
}
