import { DestroyableBlock } from './DestroyableBlock';

export class BrickBlock extends DestroyableBlock {
  protected override spriteName = 'BrickBlock';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
