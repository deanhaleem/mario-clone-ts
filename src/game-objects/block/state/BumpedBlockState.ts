import { IBlock } from '../types';
import { BlockState } from './BlockState';

export class BumpedBlockState extends BlockState {
  // private readonly postBumpBlockState: ContructorFunction;

  constructor(block: IBlock /* blockStateType:  ContructorFunction*/) {
    super(block);

    // this.block.setSprite(blockStateType.spriteName);
    // TimedActionManager.instance.registerTimedAction(playerBumpAnimation, setStateAfterBump, Timers.blockBumpTimer);
  }

  private playBumpAnimation(elapsedTime: number) {
    // this.block.location +=
    //   elapsedTime < Timers.blockBumpTimer / 2.0
    //     ? Physics.blockBumpVelocity
    //     : -Physics.blockBumpVelocity;
  }

  private setStateAfterBump() {
    // this.block.blockState = postBumpBlockState.apply(this.block);
  }
}
