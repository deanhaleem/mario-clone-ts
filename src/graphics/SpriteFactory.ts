import atlasMap from '../../public/assets/atlas/atlas-map.json';
import getCurrentScene from '../scenes/Scene';
import { Sprite } from './Sprite';
import { SpriteDetails } from './types';

export default class SpriteFactory {
  public static readonly instance = new SpriteFactory();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public loadContent(scene: Phaser.Scene) {
    // TODO: should I make this more of a data driven method?
    scene.load.atlas(
      'mario',
      'assets/sprite-sheets/mario.png',
      'assets/atlas/mario-atlas.json'
    );
  }

  public createSprite(objectName: string): Sprite {
    const scene = getCurrentScene();
    // TODO: fix error by creating type equal to possible keys of atlasMap?
    const spriteDetails = atlasMap[objectName] as SpriteDetails;
    return new Sprite(spriteDetails, scene);
  }
}
