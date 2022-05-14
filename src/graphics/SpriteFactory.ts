import atlasMap from '../../public/assets/atlas/atlas-map.json';
import getCurrentScene from '../scenes/Scene';
import { Sprite } from './Sprite';
import { SpriteDetails } from './types';

export default class SpriteFactory {
  public static readonly instance = new SpriteFactory();

  private constructor() {}

  public loadContent(scene: Phaser.Scene) {
    // TODO: should I make this more of a data driven method?
    scene.load.atlas(
      'mario',
      'assets/sprite-sheets/mario.png',
      'assets/atlas/mario-atlas.json'
    );

    scene.load.atlas(
      'blocks',
      'assets/sprite-sheets/blocksp-pipes.png',
      'assets/atlas/block-atlas.json'
    );

    scene.load.atlas(
      'enemies',
      'assets/sprite-sheets/enemies.png',
      'assets/atlas/enemy-atlas.json'
    );

    scene.load.atlas(
      'items',
      'assets/sprite-sheets/Items-Projectiles.png',
      'assets/atlas/item-atlas.json'
    );

    scene.load.atlas(
      'misc',
      'assets/sprite-sheets/Items-Extras.png',
      'assets/atlas/misc-atlas.json'
    );

    scene.load.atlas(
      'scenery',
      'assets/sprite-sheets/background-pipes.png',
      'assets/atlas/scenery-atlas.json'
    );
  }

  public createSprite(objectName: string): Sprite {
    const scene = getCurrentScene();
    // TODO: fix error by creating type equal to possible keys of atlasMap?

    const spriteDetails = atlasMap[objectName] as SpriteDetails;
    return new Sprite(spriteDetails, scene);
  }
}
