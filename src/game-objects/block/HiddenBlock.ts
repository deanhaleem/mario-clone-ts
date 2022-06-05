import { ItemContainingBlock } from './ItemContainingBlock';

export class HiddenBlock extends ItemContainingBlock {
  protected override spriteName = 'HiddenBlock';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }

  public override bump(): void {
    // BlockFactory.instance.createBlock('HiddenBlock', this.location);
    // Game1.instance.disposeOfObject(this);

    super.bump();
  }
}
