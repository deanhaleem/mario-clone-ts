import { Block } from './Block';

export class LargeVerticalGreenPipe extends Block {
  protected override spriteName = 'LargeVerticalGreenPipe';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
