import { Item } from './Item';

export class GreenMushroom extends Item {
  protected override spriteName = 'GreenMushroom';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
