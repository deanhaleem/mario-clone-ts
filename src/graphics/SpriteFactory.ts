import atlasMap from '../../public/assets/atlas/atlas-map.json';
import { Sprite } from './Sprite';
import { SpriteDetails } from './types';

export default class SpriteFactory {
  public static readonly instance = new SpriteFactory();

  private scene!: Phaser.Scene;

  private constructor() {}

  public loadContent(scene: Phaser.Scene) {
    // TODO: should I make this more of a data driven method?
    scene.load.atlas(
      'mario',
      'assets/sprite-sheets/mario.png',
      'assets/atlas/mario-atlas.json'
    );
  }

  public setScene(scene: Phaser.Scene) {
    this.scene = scene;
  }

  public createSprite(objectName: string): Sprite {
    // TODO: fix error by creating type equal to possible keys of atlasMap?
    const spriteDetails = atlasMap[objectName] as SpriteDetails;
    return new Sprite(spriteDetails, this.scene);
  }
}
