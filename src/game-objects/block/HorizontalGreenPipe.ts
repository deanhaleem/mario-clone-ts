import { Block } from './Block';

export class HorizontalGreenPipe extends Block {
  protected override spriteName = 'HorizontalGreenPipe';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
