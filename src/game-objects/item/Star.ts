import { SpawningItem } from './SpawningItem';

export class Star extends SpawningItem {
  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }

  public override land(): void {
    this.itemState.land();
  }

  protected override get spriteName() {
    return 'Star';
  }

  public override fall(): void {}
}
