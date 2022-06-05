import { Pipe } from './Pipe';

export class MediumVerticalGreenPipe extends Pipe {
  protected override spriteName = 'MediumVerticalGreenPipe';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
