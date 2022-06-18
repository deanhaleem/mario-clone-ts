import { SpawningItem } from './SpawningItem';

export class GreenMushroom extends SpawningItem {
  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }

  protected override get spriteName() {
    return 'GreenMushroom';
  }
}
