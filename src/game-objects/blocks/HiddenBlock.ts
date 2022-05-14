import { Block } from './Block';

export class HiddenBlock extends Block {
  protected override spriteName = 'HiddenBlock';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
