import Phaser, { Game } from 'phaser';
import config from './config';
import GameScene from './scenes/Game';

const game = new Phaser.Game(
  {
    ...config,
    scene: [GameScene],
  },
);

export const getCurrentScene = (): Phaser.Scene => game.scene.scenes[0];
