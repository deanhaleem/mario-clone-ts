import { SpawningItem } from './SpawningItem';

export class GreenMushroom extends SpawningItem {
  protected override spriteName = 'GreenMushroom';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
