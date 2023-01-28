import Phaser from 'phaser';
import GameScene from './scenes/Game';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#9290ff',
  pixelArt: true,
  scale: {
    width: 800,
    height: 400,
  },
};

const game = new Phaser.Game({
  ...config,
  scene: [GameScene.instance],
});

export default game;
