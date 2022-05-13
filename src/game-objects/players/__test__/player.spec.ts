/**
 * @jest-environment jsdom
 */

import { Player } from '../Player';
// TODO: mock unnecessary imports
// TODO: set up Phaser stuff to be jest.fn

/**
 * Dummy class since a Player object can't be instantiated.
 */
class MockPlayer extends Player {
  protected spriteName = 'mockSpriteName';

  constructor(location: Phaser.Math.Vector2) {
    super(location);
  }
}

describe('Player.ts', () => {
  let player: Player;

  beforeEach(() => {
    player = new MockPlayer(new Phaser.Math.Vector2(0, 0));
  });

  describe('jump', () => {
    it('Then moves the location up two pixels', () => {
      // Arrange
      const originalLocation = player.location;

      // Act
      player.jump();

      // Assert
      expect(player.location).toEqual(
        new Phaser.Math.Vector2(originalLocation.x, originalLocation.y - 2)
      );
    });
  });
});
