import { IEnemy } from '../../game-objects/enemy/types';
import { ICollidable } from '../../physics/types';
import { ICollision } from '../types';
import { physics } from '../../utils/constants/Physics';

export function respondToEnemyEnemyCollision(
  instigatingEnemy: ICollidable,
  receivingEnemy: ICollidable,
  collision: ICollision
): void {
  const collisionType = `${
    (instigatingEnemy as IEnemy).enemyState.constructor.name
  },${(receivingEnemy as IEnemy).enemyState.constructor.name},${
    collision.direction
  }`;
  if (enemyEnemyCollisionCommands[collisionType]) {
    enemyEnemyCollisionCommands[collisionType](
      instigatingEnemy as IEnemy,
      receivingEnemy as IEnemy,
      collision
    );
  }
}

function handleTopEnemyEnemyCollision(
  instigatingEnemy: IEnemy,
  receivingEnemy: IEnemy,
  collision: ICollision
) {
  instigatingEnemy.location.subtract({
    x: 0,
    y: collision.intersection.height,
  });
  receivingEnemy.location.add({
    x: 0,
    y: collision.intersection.height,
  });
}

function handleBottomEnemyEnemyCollision(
  instigatingEnemy: IEnemy,
  receivingEnemy: IEnemy,
  collision: ICollision
) {
  instigatingEnemy.location.add({
    x: 0,
    y: collision.intersection.height,
  });
  receivingEnemy.location.subtract({
    x: 0,
    y: collision.intersection.height,
  });
}

function handleLeftEnemyEnemyCollision(
  instigatingEnemy: IEnemy,
  receivingEnemy: IEnemy,
  collision: ICollision
) {
  instigatingEnemy.location.add({
    x: collision.intersection.width,
    y: 0,
  });
  receivingEnemy.location.subtract({
    x: collision.intersection.width,
    y: 0,
  });
  instigatingEnemy.changeDirection();
  receivingEnemy.changeDirection();
}

function handleRightEnemyEnemyCollision(
  instigatingEnemy: IEnemy,
  receivingEnemy: IEnemy,
  collision: ICollision
) {
  instigatingEnemy.location.subtract({
    x: collision.intersection.width,
    y: 0,
  });
  receivingEnemy.location.add({
    x: collision.intersection.width,
    y: 0,
  });
  instigatingEnemy.changeDirection();
  receivingEnemy.changeDirection();
}

function handleLeftEnemyShellCollision(
  instigatingEnemy: IEnemy,
  receivingEnemy: IEnemy,
  collision: ICollision
) {
  if (Math.abs(receivingEnemy.velocity.x) >= physics.shellSpeed) {
    instigatingEnemy.flip();

    // StatManager.instance.gainPoints(collision.intersection, 'handleLeftEnemyShellCollision');
    // SoundManager.instance.playSoundEffect('handleLeftEnemyShellCollision')
  } else {
    instigatingEnemy.location.add({
      x: collision.intersection.width,
      y: 0,
    });
    instigatingEnemy.changeDirection();
  }
}

function handleRightEnemyShellCollision(
  instigatingEnemy: IEnemy,
  receivingEnemy: IEnemy,
  collision: ICollision
) {
  if (Math.abs(receivingEnemy.velocity.x) >= physics.shellSpeed) {
    instigatingEnemy.flip();

    // StatManager.instance.gainPoints(collision.intersection, 'handleLeftEnemyShellCollision');
    // SoundManager.instance.playSoundEffect('handleLeftEnemyShellCollision')
  } else {
    instigatingEnemy.location.subtract({
      x: collision.intersection.width,
      y: 0,
    });
    instigatingEnemy.changeDirection();
  }
}

const enemyEnemyCollisionCommands: {
  [key: string]: (
    instigatingEnemy: IEnemy,
    receivingEnemy: IEnemy,
    collision: ICollision
  ) => void;
} = {
  'WalkingEnemyState,WalkingEnemyState,TopCollision':
    handleTopEnemyEnemyCollision,
  'WalkingEnemyState,WalkingEnemyState,BottomCollision':
    handleBottomEnemyEnemyCollision,
  'WalkingEnemyState,WalkingEnemyState,LeftCollision':
    handleLeftEnemyEnemyCollision,
  'WalkingEnemyState,WalkingEnemyState,RightCollision':
    handleRightEnemyEnemyCollision,

  'WalkingEnemyState,ShellEnemyState,TopCollision':
    handleTopEnemyEnemyCollision,
  'WalkingEnemyState,ShellEnemyState,BottomCollision':
    handleBottomEnemyEnemyCollision,
  'WalkingEnemyState,ShellEnemyState,LeftCollision':
    handleLeftEnemyShellCollision,
  'WalkingEnemyState,ShellEnemyState,RightCollision':
    handleRightEnemyShellCollision,

  'SleepingEnemyState,ShellEnemyState,TopCollision':
    handleTopEnemyEnemyCollision,
  'SleepingEnemyState,ShellEnemyState,BottomCollision':
    handleBottomEnemyEnemyCollision,
  'SleepingEnemyState,ShellEnemyState,LeftCollision':
    handleLeftEnemyShellCollision,
  'SleepingEnemyState,ShellEnemyState,RightCollision':
    handleRightEnemyShellCollision,
};
