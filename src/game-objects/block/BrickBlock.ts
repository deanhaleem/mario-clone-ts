import { DestroyableBlock } from './DestroyableBlock';

export class BrickBlock extends DestroyableBlock {
  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }

  protected override get spriteName() {
    return 'BrickBlock';
  }
}
