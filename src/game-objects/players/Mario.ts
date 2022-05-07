import { Player } from './Player';

export default class Mario extends Player {
  // TODO: need to have the states include a "name" field
  protected override spriteName = 'StarSmallLeftRunningMario';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
