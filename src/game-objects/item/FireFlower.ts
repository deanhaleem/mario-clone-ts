import { Item } from './Item';

export class FireFlower extends Item {
  protected override spriteName = 'FireFlower';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
