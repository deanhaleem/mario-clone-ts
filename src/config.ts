import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#9290ff',
  pixelArt: true,
  scale: {
    width: 800,
    height: 400,
  },
  physics: {
    default: 'arcade',
  },
};
