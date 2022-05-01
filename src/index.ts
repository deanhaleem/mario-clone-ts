import Phaser, { Game } from 'phaser';
import config from './config';
import GameScene from './scenes/Game';

const game = new Phaser.Game(
  {
    ...config,
    scene: [GameScene],
  },
);

export const getCurrentScene = (): Phaser.Scene => {
  console.log('here')
  console.log(game.scene.scenes)
  const temp = game.scene.scenes[0];
  console.log('hi')
  return temp
}
