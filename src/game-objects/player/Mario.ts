import { Directions } from '../../physics/types';
import { Player } from './Player';
import { SmallPowerUpState } from './state/SmallPowerUpState';
import { StandingActionState } from './state/StandingActionState';

export class Mario extends Player {
  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.powerUpState = new SmallPowerUpState(this);
    super.actionState = new StandingActionState(this);
    super.direction = Directions.Right;
  }
}
