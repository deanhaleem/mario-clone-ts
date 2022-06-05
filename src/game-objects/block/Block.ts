import { GameObject } from '../GameObject';
import { IBlockState } from './state/types';
import { IBlock } from './types';

export abstract class Block extends GameObject implements IBlock {
  public blockState: IBlockState;

  protected constructor(location: Phaser.Math.Vector2) {
    super(location);
  }

  public override update(time: number, delta: number): void {
    console.log(this.spriteName);
    console.log(this.blockState);
    this.blockState.update(time, delta);

    super.update(time, delta);
  }

  public bump(): void {
    this.blockState.bump();
  }

  public destroy(): void {
    this.blockState.destroy();
  }
}
