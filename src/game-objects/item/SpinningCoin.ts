import { Item } from './Item';

export class SpinningCoin extends Item {
  protected override spriteName = 'SpinningCoin';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
