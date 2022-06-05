import { IBlock } from '../types';
import { BlockState } from './BlockState';

export class DestroyedBlockState extends BlockState {
  constructor(block: IBlock) {
    super(block);

    this.block.setSprite('DestroyedBlock');

    // BlockFactory.CreateDebris(this.block.location);
    // TimedActionManager.instance.registerTimedAction(playBumpAnimation, disposeOfBlock, Timers.blockDestroyTimer);
  }

  private playBumpAnimation(elapsedTime: number): void {
    // if (elapsedTime < Timers.blockDestroyTimer / 2.0) {
    //   this.block.location += -Physics.blockBumpVelocity;
    // }
  }

  private disposeOfBlock(): void {
    // Game1.instance.disposeOfObject(this.block);
  }
}
