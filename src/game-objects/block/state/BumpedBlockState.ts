import { Constructor } from '../../../types';
import { physics } from '../../../utils/constants/Physics';
import { timers } from '../../../utils/constants/Timers';
import { IBlock } from '../types';
import { BlockState } from './BlockState';
import { IBlockState } from './types';

export class BumpedBlockState extends BlockState {
  private readonly postBumpBlockState: Constructor<IBlockState>;

  constructor(
    block: IBlock,
    blockStateType: Constructor<IBlockState>,
    spriteName: string
  ) {
    super(block);

    this.block.setSprite(spriteName);

    this.postBumpBlockState = blockStateType;
    // TimedActionManager.instance.registerTimedAction(playerBumpAnimation, setStateAfterBump, Timers.blockBumpTimer);
  }

  private playBumpAnimation(elapsedTime: number) {
    this.block.location = this.block.location.add(
      elapsedTime < timers.blockBump / 2.0
        ? physics.blockBumpVelocity
        : physics.blockBumpVelocity.negate()
    );
  }

  private setStateAfterBump() {
    this.block.blockState = new this.postBumpBlockState(this.block);
  }
}
