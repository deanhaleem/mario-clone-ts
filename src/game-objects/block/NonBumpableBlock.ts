import { Block } from './Block';
import { NonBumpableBlockState } from './state/NonBumpableBlockState';

export abstract class NonBumpableBlock extends Block {
  protected constructor(location: Phaser.Math.Vector2) {
    super(location);

    this.blockState = new NonBumpableBlockState(this);
  }
}
