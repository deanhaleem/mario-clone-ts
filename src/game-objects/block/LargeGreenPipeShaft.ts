import { Block } from './Block';

export class LargeGreenPipeShaft extends Block {
  protected override spriteName = 'LargeGreenPipeShaft';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
