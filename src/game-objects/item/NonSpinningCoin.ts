import { Item } from './Item';
import { IdleItemState } from './state/IdleItemState';

export class NonSpinningCoin extends Item {
  protected override spriteName = 'NonSpinningCoin';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
    super.itemState = new IdleItemState(this);
  }

  public override fall(): void {}
}
