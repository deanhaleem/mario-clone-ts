import { Block } from './Block';

export class BrickBlock extends Block {
  protected override spriteName = 'BrickBlock';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
