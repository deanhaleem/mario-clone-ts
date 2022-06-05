import { SpawningItem } from './SpawningItem';

export class Star extends SpawningItem {
  protected override spriteName = 'Star';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }

  public override land(): void {
    this.itemState.land();
  }

  public override fall(): void {}
}
