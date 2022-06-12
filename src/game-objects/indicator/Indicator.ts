import { physics } from '../../utils/constants/Physics';
import { GameObject } from '../GameObject';
import { IIndicator } from './types';

export class Indicator extends GameObject implements IIndicator {
  private readonly pointIndicator: string;

  constructor(location: Phaser.Math.Vector2, points: number) {
    super(location);

    this.pointIndicator = points.toString();

    // TimedActionManager.instance.registerTimedAction(null, disposeOfIndicator, timers.indicatorRiseTime);
  }

  public override update(time: number, delta: number): void {
    this.location = this.location.subtract(physics.indicatorVelocity);
  }

  public override draw(renderTexture: Phaser.GameObjects.RenderTexture): void {
    // TODO
  }

  private disposeOfIndicator(): void {
    //Game1.instance.disposeOfObject(this)
  }
}
