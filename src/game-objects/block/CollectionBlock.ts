import { NonBumpableBlock } from './NonBumpableBlock';

export abstract class CollectionBlock extends NonBumpableBlock {
  private readonly numBlocksInRow: number;
  private readonly numBlocksInColumn: number;

  //   public override hitbox = new Phaser.Geom.Rectangle(
  //     super.hitbox.x,
  //     super.hitbox.y,
  //     super.hitbox.width * this.numBlocksInRow,
  //     super.hitbox.height * this.numBlocksInColumn
  //   );

  constructor(location: Phaser.Math.Vector2, size: Phaser.Math.Vector2) {
    super(location);

    this.numBlocksInRow = size.x;
    this.numBlocksInColumn = size.y;
  }

  public override draw(renderTexture: Phaser.GameObjects.RenderTexture): void {
    const initialLocation = this.location;

    for (let i = 0; i < this.numBlocksInColumn; i++) {
      for (let j = 0; j < this.numBlocksInRow; j++) {
        super.draw(renderTexture);
        // this.location += new Phaser.Math.Vector2(Offsets.tileOffset, 0);
      }
      //   this.location += new Phaser.Math.Vector2(
      //     initialLocation.x,
      //     initialLocation.y + Offsets.tileOffset * (i + 1)
      //   );
    }
    this.location = initialLocation;
  }
}
