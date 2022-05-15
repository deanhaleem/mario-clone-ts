import { Item } from './Item';

export class NonSpinningCoin extends Item {
  protected override spriteName = 'NonSpinningCoin';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
