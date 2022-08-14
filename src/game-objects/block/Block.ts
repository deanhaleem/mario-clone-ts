import { GameObject } from '../GameObject';
import { IBlockState } from './state/types';
import { IBlock } from './types';

export abstract class Block extends GameObject implements IBlock {
  public blockState: IBlockState;

  protected constructor(location: Phaser.Math.Vector2) {
    super(location);
  }

  public override update(time: number, delta: number): void {
    this.blockState.update(time, delta);

    super.update(time, delta);
  }

  public bump(): void {
    this.blockState.bump();
  }

  public destroy(): void {
    this.blockState.destroy();
  }

  public override get collisionDetails() {
    return {
      interface: 'IBlock',
      class: this.constructor.name,
      kinematic: false,
    };
  }
}
