import { offsets } from '../../utils/constants/Offsets';
import { NonBumpableBlock } from './NonBumpableBlock';

export abstract class CollectionBlock extends NonBumpableBlock {
  private readonly numBlocksInRow: number;
  private readonly numBlocksInColumn: number;

  protected constructor(
    location: Phaser.Math.Vector2,
    size: Phaser.Math.Vector2
  ) {
    super(location);

    this.numBlocksInRow = size.x;
    this.numBlocksInColumn = size.y;
  }

  public override draw(renderTexture: Phaser.GameObjects.RenderTexture): void {
    const initialLocation = new Phaser.Math.Vector2(this.location);
    for (let i = 0; i < this.numBlocksInColumn; i++) {
      for (let j = 0; j < this.numBlocksInRow; j++) {
        super.draw(renderTexture);
        this.location.add(new Phaser.Math.Vector2(offsets.tile, 0));
      }
      this.location = new Phaser.Math.Vector2(
        initialLocation.x,
        initialLocation.y + offsets.tile * (i + 1)
      );
    }

    this.location = initialLocation;
  }

  public override get hitbox(): Phaser.Geom.Rectangle {
    return new Phaser.Geom.Rectangle(
      super.hitbox.x,
      super.hitbox.y,
      super.hitbox.width * this.numBlocksInRow,
      super.hitbox.height * this.numBlocksInColumn
    );
  }
}
