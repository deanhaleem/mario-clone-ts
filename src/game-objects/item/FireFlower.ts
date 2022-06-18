import { SpawningItem } from './SpawningItem';

export class FireFlower extends SpawningItem {
  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }

  protected override get spriteName() {
    return 'FireFlower';
  }
}
