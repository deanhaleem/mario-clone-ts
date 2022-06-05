import { Pipe } from './Pipe';

export class LargeVerticalGreenPipe extends Pipe {
  protected override spriteName = 'LargeVerticalGreenPipe';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
