import { physics } from '../../utils/constants/Physics';
import { Item } from './Item';
import { IdleItemState } from './state/IdleItemState';

export class SpinningCoin extends Item {
  protected override spriteName = 'SpinningCoin';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
    super.itemState = new IdleItemState(this);

    super.applyImpulse(physics.spinningCoinImpulse);
    super.applyForce(physics.gravitationalForce);
    super.setMaxVelocity(physics.maxSpinningCoinVelocity);

    // StatManager.instance.gainPoints(new Phaser.Geom.Rectangle(), 'SpinningCoin');
    // StatManager.instance.gainCoin();
    // SoundManager.instance.playSoundEffect('spinningCoin');
  }

  public override update(time: number, delta: number): void {
    if (this.velocity.y >= physics.maxSpinningCoinVelocity.y) {
      // Game1.instance.dispostOfObject(this);
    }
    super.update(time, delta);
  }
}
