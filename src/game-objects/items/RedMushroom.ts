import { Item } from './Item';

export class RedMushroom extends Item {
  protected override spriteName = 'RedMushroom';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
