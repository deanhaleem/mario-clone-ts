import { UsedBlock } from './UsedBlock';

export class BlockFactory {
  public static instance: BlockFactory = new BlockFactory();

  private readonly blockCreators = {
    HiddenBlock: UsedBlock,
  };

  private constructor() {}

  public CreateBlock(blockType: string, location: Phaser.Math.Vector2): void {
    // Game1.instance.registerGameObject(blockCreators[blockType](location));
  }

  public static createDebris(location: Phaser.Math.Vector2): void {
    // Game1.instance.unregisterGameObject(new DebrisBlock(location  + Offsets.topRightDebrisSpawnOffset, Physics.topRightDebricVelocity));
    // Game1.instance.unregisterGameObject(new DebrisBlock(location  + Offsets.topLeftDebrisSpawnOffset, Physics.topLeftDebricVelocity));
    // Game1.instance.unregisterGameObject(new DebrisBlock(location  + Offsets.bottomRightDebrisSpawnOffset, Physics.bottomRightDebricVelocity));
    // Game1.instance.unregisterGameObject(new DebrisBlock(location  + Offsets.bottomLeftDebrisSpawnOffset, Physics.bottomLeftDebricVelocity));
  }
}
