import { offsets } from '../../utils/constants/offsets';
import { Item } from './Item';
import { IdleItemState } from './state/IdleItemState';

export class Flagpole extends Item {
  private canUpdate: boolean;

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
    super.itemState = new IdleItemState(this);

    this.canUpdate = false;
  }

  public override update(time: number, delta: number): void {
    if (this.canUpdate) {
      super.update(time, delta);
    }
  }

  public override fall(): void {
    if (!this.canUpdate) {
      // TimedActionManager.instance.registerTimedAction(null, stopFlagFall, timers.flagFall);
    }
    this.canUpdate = true;
  }

  protected override get spriteName() {
    return 'Flagpole';
  }

  public override get hitbox(): Phaser.Geom.Rectangle {
    return new Phaser.Geom.Rectangle(
      super.hitbox.x + offsets.flagpoleWidth,
      super.hitbox.y,
      super.hitbox.width,
      super.hitbox.height
    );
  }

  private stopFlagFall() {
    this.canUpdate = false;
  }
}
