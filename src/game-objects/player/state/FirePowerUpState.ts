import { utilities } from '../../../utils/constants/Utilities';
import { IPlayer } from '../types';
import { PowerUpState } from './PowerUpState';

export class FirePowerUpState extends PowerUpState {
  private attackTimer: number;
  private elapsedTime: number;

  public override spriteName = 'Fire';

  constructor(player: IPlayer) {
    super(player);

    this.attackTimer = 0;
    this.elapsedTime = 0;
  }

  public override update(time: number, delta: number): void {
    this.elapsedTime += delta / 1000;

    if (this.elapsedTime > utilities.attackDelay) {
      this.attackTimer = 0;
      this.elapsedTime = 0;
    }

    super.update(time, delta);
  }

  public override attack(): void {
    if (this.attackTimer < utilities.attackLimit) {
      this.player.actionState.attack('fireball');
      this.attackTimer++;
    }
  }

  public override upgrade(): void {}
}
