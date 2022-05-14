import { Block } from './Block';

export class FloorBlock extends Block {
  protected override spriteName = 'FloorBlock';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
