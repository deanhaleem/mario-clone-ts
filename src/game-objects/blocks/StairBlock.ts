import { Block } from './Block';

export class StairBlock extends Block {
  protected override spriteName = 'StairBlock';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
