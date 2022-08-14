import { physics } from '../../../utils/constants/Physics';
import { timers } from '../../../utils/constants/Timers';
import { BlockFactory } from '../BlockFactory';
import { IBlock } from '../types';
import { BlockState } from './BlockState';

export class DestroyedBlockState extends BlockState {
  constructor(block: IBlock) {
    super(block);

    this.block.setSprite('DestroyedBlock');

    BlockFactory.createDebris(this.block.location);
    // TimedActionManager.instance.registerTimedAction(playBumpAnimation, disposeOfBlock, Timers.blockDestroyTimer);
  }

  private playBumpAnimation(elapsedTime: number): void {
    if (elapsedTime < timers.blockDestroy / 2.0) {
      this.block.location.add(physics.blockBumpVelocity.negate());
    }
  }

  private disposeOfBlock(): void {
    // Game1.instance.disposeOfObject(this.block);
  }
}
