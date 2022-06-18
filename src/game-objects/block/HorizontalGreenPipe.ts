import { Pipe } from './Pipe';

export class HorizontalGreenPipe extends Pipe {
  public constructor(
    location: Phaser.Math.Vector2,
    warpLocation: Phaser.Math.Vector2
  ) {
    super(location, warpLocation);

    super.setSprite(this.spriteName);
  }

  public override get warpHitbox(): Phaser.Geom.Rectangle {
    return new Phaser.Geom.Rectangle(
      this.hitbox.x,
      this.hitbox.y + this.hitbox.height / 2,
      this.hitbox.width,
      this.hitbox.height / 2
    );
  }

  protected override get spriteName() {
    return 'HorizontalGreenPipe';
  }
}
