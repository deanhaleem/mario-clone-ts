import { Block } from './Block';

export class UsedBlock extends Block {
  protected override spriteName = 'UsedBlock';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
