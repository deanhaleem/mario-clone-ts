import { Block } from './Block';

export class QuestionBlock extends Block {
  // TODO: potentially get rid of instance variable and just pass in method call
  // directly
  protected override spriteName = 'BrickBlock';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
