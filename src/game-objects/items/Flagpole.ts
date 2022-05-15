import { Item } from './Item';

export class Flagpole extends Item {
  protected override spriteName = 'Flagpole';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
