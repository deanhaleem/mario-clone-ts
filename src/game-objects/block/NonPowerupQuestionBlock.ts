import { ItemContainingBlock } from './ItemContainingBlock';

export class NonPowerUpQuestionBlock extends ItemContainingBlock {
  protected override spriteName = 'QuestionBlock';

  constructor(
    location: Phaser.Math.Vector2 /* itemType: ConstructorFunction */
  ) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
