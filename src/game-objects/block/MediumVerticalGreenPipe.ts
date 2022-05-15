import { Block } from './Block';

export class MediumVerticalGreenPipe extends Block {
  protected override spriteName = 'MediumVerticalGreenPipe';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
