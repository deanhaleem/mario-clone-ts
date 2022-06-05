import { FireFlower } from './FireFlower';
import { GreenMushroom } from './GreenMushroom';
import { RedMushroom } from './RedMushroom';
import { SpinningCoin } from './SpinningCoin';
import { Star } from './Star';

export class ItemFactory {
  public static instance: ItemFactory = new ItemFactory();

  private readonly itemCreators = {
    spinningCoin: SpinningCoin,
    fireFlower: FireFlower,
    greenMushroom: GreenMushroom,
    redMushroom: RedMushroom,
    star: Star,
  };

  private constructor() {}

  public createItem(itemType: string, location: Phaser.Math.Vector2) {
    // Game1.instance.registerGamObject(itemCreators[itemType](location));
  }
}
