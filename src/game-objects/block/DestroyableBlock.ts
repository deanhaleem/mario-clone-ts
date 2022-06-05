import { Block } from './Block';
import { DestroyableBlockState } from './state/DestroyableBlockState';

export abstract class DestroyableBlock extends Block {
  protected constructor(location: Phaser.Math.Vector2) {
    super(location);

    this.blockState = new DestroyableBlockState(this);
  }
}
