import game from '..';

export default function getCurrentScene(): Phaser.Scene {
  return game.scene.getScene('GameScene');
}
