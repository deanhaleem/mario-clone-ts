import { Pipe } from './Pipe';

export class HorizontalGreenPipe extends Pipe {
  protected override spriteName = 'HorizontalGreenPipe';

  // public override warpHitbox = new Phaser.Geom.Rectangle(
  //   this.hitbox.x,
  //   this.hitbox.y + this.hitbox.height / 2,
  //   hitbox.width,
  //   hitbox.height / 2
  // );

  public constructor(location: Phaser.Math.Vector2) {
    super(location); // TODO: warpLocation

    super.setSprite(this.spriteName);
  }
}
