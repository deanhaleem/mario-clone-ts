import Phaser from 'phaser';
import { Sprite, SpriteDetails } from '../graphics/Sprite';
import marioAtlas from '../../public/assets/atlas/mario-atlas.json'

export default class Demo extends Phaser.Scene {
  private sprite;

  private rt: Phaser.GameObjects.RenderTexture;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.atlas('mario', 'assets/sprite-sheets/mario.png', 'assets/atlas/mario-atlas.json');

    this.load.audio('theme', [
      'assets/sound-fx/smb_1-up.wav',
    ]);

    this.add.text(100, 100, 'Button', { fontFamily: 'Emulogic' });

    //this.load.image('mario-temp', 'assets/sprite-sheets/mario.png');
  }

  create() {
    // TODO: update atlas config to be like c#, except instead of the "0": [] for frames, I need to create entirely new object. key will just be dead-mario-0 for example
    // TODO: then each sprite will have image game object like below.
   // const image = this.add.image(50, 375, 'mario', 'small-left-jumping-mario');
   const image = new Phaser.GameObjects.Image(this, 0, 0, 'mario', 'DeadMario-0-0').setScale(2).setDepth(0.99).setTint(0xA290ff)
   const image2 = new Phaser.GameObjects.Image(this, 0, 0, 'mario', 'DeadMario-0-0').setScale(2).setDepth(0.8);
  
  const frames = this.textures.get('mario').frames;
  const frameNames = this.textures.get('mario').getFrameNames();
  console.log(frames[frameNames[0]].customData)
  this.sprite = new Sprite(frames['BigRightWalkingMario-0-0'].customData as SpriteDetails, 'mario')

    //image.setScale(2).setTint(0xA290ff);
    this.rt = this.add.renderTexture(0, 0, 800, 480);
    this.rt.beginDraw();
    // //rt.batchDrawFrame('mario',  'dead-mario', 155, 200)
    // rt.batchDraw(image, 510, 200)
    // rt.batchDraw(image2, 525, 200)
    this.sprite.draw(this.rt);
    this.rt.endDraw();
  }

  update(time: number, delta: number): void {
    this.sprite.update();

    this.rt.clear();
    this.rt.beginDraw();
    // //rt.batchDrawFrame('mario',  'dead-mario', 155, 200)
    // rt.batchDraw(image, 510, 200)
    // rt.batchDraw(image2, 525, 200)
    this.sprite.draw(this.rt);
    this.rt.endDraw();
  }
}
