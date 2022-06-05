import { SpawningItem } from './SpawningItem';

export class FireFlower extends SpawningItem {
  protected override spriteName = 'FireFlower';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
