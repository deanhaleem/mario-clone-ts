import { IndicatorFactory } from '../game-objects/indicator/IndicatorFactory';
import { utilities } from '../utils/constants/utilities';

let elapsedTime = 0;
let enemiesKilledConsecutively = 0;

let coins = 0;
let lives = 3;
let score = 0;
let remainingTime = 0;

export function pickUpCoin() {
  coins++;
}

export function gainOrLoseLife(isLifeGainingEvent: boolean) {
  lives += isLifeGainingEvent ? utilities.lifeGained : -utilities.lifeGained;
}

export function gainPoints(
  pointEventIntersection: Phaser.Geom.Rectangle,
  pointEventName: string
) {
  if (pointAllocators[pointEventName]) {
    pointAllocators[pointEventName](pointEventIntersection, pointEventName);
  } else {
    allocatePoints(pointEventName);
  }
}

export function resetConsecutivePoints() {
  enemiesKilledConsecutively = 0;
}

export function softReset() {
  setTime(400);

  elapsedTime = 0;
}

export function hardReset() {
  coins = 0;
  lives = 3;
  score = 0;
  setTime(400);

  elapsedTime = 0;
  enemiesKilledConsecutively = 0;
}

export function tallyUp() {
  setTime(remainingTime - 1);
}

export function update(time: number) {
  elapsedTime += time / 1000;

  if (elapsedTime >= utilities.timeToDecrement) {
    setTime(remainingTime - 1);
    elapsedTime = 0;
  }
}

export const gameStats = {
  coins,
  lives,
  score,
  time: remainingTime,
};

function allocatePoints(pointEventName: string) {
  score += points[pointEventName];
}

function allocatePointsWithIndicator(
  pointEventIntersection: Phaser.Geom.Rectangle,
  pointEventName: string
) {
  score += points[pointEventName];
  IndicatorFactory.createIndicator(
    pointEventIntersection,
    points[pointEventName]
  );
}

function allocateConsecutivePoints(
  pointEventIntersection: Phaser.Geom.Rectangle,
  pointEventName: string
) {
  const pointsGained =
    points[pointEventName] +
    (points[pointEventName] * enemiesKilledConsecutively++) / 2;
  score += pointsGained;
  IndicatorFactory.createIndicator(pointEventIntersection, pointsGained);
}

function allocateFlagpolePoints(
  pointEventIntersection: Phaser.Geom.Rectangle,
  pointEventName: string
) {
  const pointsGained =
    (-pointEventIntersection.top + utilities.flagpoleBonusPoints) *
    points[pointEventName];
  score += pointsGained;
  IndicatorFactory.createIndicator(pointEventIntersection, pointsGained);
}

function setTime(value: number) {
  remainingTime = value;
  // TODO
  if (remainingTime < 0) {
    remainingTime = 0;
  }
}

const points: Record<string, number> = {
  handleTopEnemyBlockCollision: 100,
  handleLeftEnemyShellCollision: 100,
  handleRightEnemyShellCollision: 100,

  handleDestroyingPlayerBlockCollision: 50,

  handleTopPlayerEnemyCollision: 100,
  handleFlippingPlayerEnemyCollision: 100,
  handleDisarmingPlayerEnemyCollision: 100,
  handleTopPlayerShellCollision: 100,
  handleLeftPlayerShellCollision: 100,
  handleRightPlayerShellCollision: 100,

  handlePlayerFireFlowerCollision: 1000,
  handlePlayerGreenMushroomCollision: 1000,
  handlePlayerRedMushroomCollision: 1000,
  handlePlayerNonSpinningCoinCollision: 200,
  handlePlayerStarCollision: 1000,
  handleNonUpgradingPlayerPowerUpCollision: 1000,
  handleBlinkingPlayerRedMushroomCollision: 1000,
  handleBlinkingPlayerFireFlowerCollision: 1000,
  handleBlinkingPlayerStarCollision: 1000,
  handlePlayerFlagpoleCollision: 10,
  SpinningCoin: 200,

  VictoryGameState: 50,

  GoombaFireball: 100,
  KoopaFireball: 200,
  FireballGoomba: 100,
  FireballKoopa: 200,
};

const pointAllocators: Record<
  string,
  (
    pointEventIntersection: Phaser.Geom.Rectangle,
    pointEventName: string
  ) => void
> = {
  handleTopEnemyBlockCollision: allocatePointsWithIndicator,
  handleLeftEnemyShellCollision: allocateConsecutivePoints,
  handleRightEnemyShellCollision: allocateConsecutivePoints,

  handleTopPlayerEnemyCollision: allocateConsecutivePoints,
  handleFlippingPlayerEnemyCollision: allocatePointsWithIndicator,
  handleDisarmingPlayerEnemyCollision: allocateConsecutivePoints,
  handleTopPlayerShellCollision: allocateConsecutivePoints,
  handleLeftPlayerShellCollision: allocatePointsWithIndicator,
  handleRightPlayerShellCollision: allocatePointsWithIndicator,

  handlePlayerFireFlowerCollision: allocatePointsWithIndicator,
  handlePlayerGreenMushroomCollision: allocatePointsWithIndicator,
  handlePlayerRedMushroomCollision: allocatePointsWithIndicator,
  handlePlayerStarCollision: allocatePointsWithIndicator,
  handleBlinkingPlayerRedMushroomCollision: allocatePointsWithIndicator,
  handleBlinkingPlayerFireFlowerCollision: allocatePointsWithIndicator,
  handleBlinkingPlayerStarCollision: allocatePointsWithIndicator,
  handlePlayerFlagpoleCollision: allocateFlagpolePoints,
  handleNonUpgradingPlayerPowerUpCollision: allocatePointsWithIndicator,

  GoombaFireball: allocatePointsWithIndicator,
  KoopaFireball: allocatePointsWithIndicator,
  FireballGoomba: allocatePointsWithIndicator,
  FireballKoopa: allocatePointsWithIndicator,
};
