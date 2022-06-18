import { NonBumpableBlock } from './NonBumpableBlock';
import { BumpedBlockState } from './state/BumpedBlockState';
import { UsedBlockState } from './state/UsedBlockState';

export class UsedBlock extends NonBumpableBlock {
  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);

    this.blockState = new BumpedBlockState(this, UsedBlockState, 'UsedBlock');
  }

  protected override get spriteName() {
    return 'UsedBlock';
  }
}
