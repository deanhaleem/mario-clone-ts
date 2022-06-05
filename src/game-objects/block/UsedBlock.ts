import { NonBumpableBlock } from './NonBumpableBlock';
import { BumpedBlockState } from './state/BumpedBlockState';

export class UsedBlock extends NonBumpableBlock {
  protected override spriteName = 'UsedBlock';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
    this.blockState = new BumpedBlockState(this); // TODO: pass in type
  }
}
