export const physics = {
  gravitationalForce: new Phaser.Math.Vector2(0, 50),

  topRightDebrisVelocity: new Phaser.Math.Vector2(2, -7),
  topLeftDebrisVelocity: new Phaser.Math.Vector2(-2, -7),
  bottomRightDebrisVelocity: new Phaser.Math.Vector2(2, -5),
  bottomLeftDebrisVelocity: new Phaser.Math.Vector2(-2, -5),

  rightProjectileVelocity: new Phaser.Math.Vector2(7, 3),
  leftProjectileVelocity: new Phaser.Math.Vector2(-7, 3),

  blockBumpVelocity: new Phaser.Math.Vector2(0, 1),

  flippedEnemyImpulse: new Phaser.Math.Vector2(0, -5),
  flippedEnemyMaxVelocity: new Phaser.Math.Vector2(1, 5),

  shellMaxVelocity: new Phaser.Math.Vector2(7, 3),

  enemyWakeUpImpulse: new Phaser.Math.Vector2(-1, 0),

  bouncingItemImpulse: new Phaser.Math.Vector2(2, -2),
  bouncingItemBounceImpulse: new Phaser.Math.Vector2(0, -7),
  movingItemImpulse: new Phaser.Math.Vector2(2, 0),
  spawningItemImpulse: new Phaser.Math.Vector2(0, -1),

  projectileBounceImpulse: new Phaser.Math.Vector2(0, -4),

  maxDebrisVelocity: new Phaser.Math.Vector2(2, 12),
  maxEnemyVelocity: new Phaser.Math.Vector2(1, 3),

  spinningCoinImpulse: new Phaser.Math.Vector2(0, -9),
  maxSpinningCoinVelocity: new Phaser.Math.Vector2(0, 9),

  maxItemVelocity: new Phaser.Math.Vector2(2, 3),
  maxPlayerVelocity: new Phaser.Math.Vector2(2.75, 9),
  maxProjectileVelocity: new Phaser.Math.Vector2(7, 3),

  indicatorVelocity: new Phaser.Math.Vector2(0, 1),

  playerFallingGravitationalForce: new Phaser.Math.Vector2(0, 80),
  playerJumpingGravitationalForce: new Phaser.Math.Vector2(0, 45),
  playerJumpImpulse: new Phaser.Math.Vector2(0, -12),
  horizontalPlayerAerialForce: new Phaser.Math.Vector2(7.5, 20),
  deadPlayerImpulse: new Phaser.Math.Vector2(0, -5),
  deadPlayerGravitationalForce: new Phaser.Math.Vector2(0, 25),
  playerHorizontalAcceleration: new Phaser.Math.Vector2(7.5, 0),
  playerMaxRunningVelocity: new Phaser.Math.Vector2(5.65, 9),
  playerSlidingAcceleration: new Phaser.Math.Vector2(20, 0),

  verticalWarpVelocity: new Phaser.Math.Vector2(0, 0.5),
  horizontalWarpVelocity: new Phaser.Math.Vector2(0.5, 0),
  warpSpeed: 0.5,

  stopJumpingThreshold: 6,

  shellSpeed: 7,

  blockBumpForce: new Phaser.Math.Vector2(0, 2),
  bumpEnemyForce: new Phaser.Math.Vector2(0, -8),
  slideDownFlagImpulse: new Phaser.Math.Vector2(0, 5),

  collisionDelta: 0.2,
  deltaTime: 0.0066667,
};
