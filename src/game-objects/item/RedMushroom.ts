import { SpawningItem } from './SpawningItem';

export class RedMushroom extends SpawningItem {
  protected override spriteName = 'RedMushroom';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
