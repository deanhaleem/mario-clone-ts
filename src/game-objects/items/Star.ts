import { Item } from './Item';

export class Star extends Item {
  protected override spriteName = 'Star';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
