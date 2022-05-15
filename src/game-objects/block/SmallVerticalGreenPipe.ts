import { Block } from './Block';

export class SmallVerticalGreenPipe extends Block {
  protected override spriteName = 'SmallVerticalGreenPipe';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
