import { Pipe } from './Pipe';

export class SmallVerticalGreenPipe extends Pipe {
  protected override spriteName = 'SmallVerticalGreenPipe';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
