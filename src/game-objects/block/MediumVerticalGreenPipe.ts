import { Pipe } from './Pipe';

export class MediumVerticalGreenPipe extends Pipe {
  public constructor(
    location: Phaser.Math.Vector2,
    warpLocation: Phaser.Math.Vector2
  ) {
    super(location, warpLocation);

    super.setSprite(this.spriteName);
  }

  protected override get spriteName() {
    return 'MediumVerticalGreenPipe';
  }
}
