import Phaser from "phaser";
import config from './config';
import GameScene from './scenes/Game';

const game = new Phaser.Game({
  ...config,
  scene: [GameScene],
});

export default game;
