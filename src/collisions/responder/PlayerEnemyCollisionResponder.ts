import { IEnemy } from '../../game-objects/enemy/types';
import { ICollidable } from '../../physics/types';
import { ICollision } from '../types';
import { IPlayer } from '../../game-objects/player/types';
import { physics } from '../../utils/constants/Physics';

export function respondToPlayerEnemyCollision(
  collisionInstigator: ICollidable,
  collisionReceiver: ICollidable,
  collision: ICollision
): void {
  if (collisionInstigator.collisionDetails.interface === 'IPlayer') {
    const collisionType = `${collisionInstigator.constructor.name},${
      collisionReceiver.constructor.name
    },${(collisionReceiver as IEnemy).enemyState.constructor.name},${
      collision.direction
    }`;
    if (playerEnemyCollisionCommands[collisionType]) {
      playerEnemyCollisionCommands[collisionType](
        collisionInstigator as IPlayer,
        collisionReceiver as IEnemy,
        collision
      );
    }
  } else {
    const collisionType = `${collisionInstigator.constructor.name},${
      collisionReceiver.constructor.name
    },${(collisionInstigator as IEnemy).enemyState.constructor.name},${
      collision.direction
    }`;
    if (playerEnemyCollisionCommands[collisionType]) {
      playerEnemyCollisionCommands[collisionType](
        collisionReceiver as IPlayer,
        collisionInstigator as IEnemy,
        collision
      );
    }
  }
}

function handleTopPlayerEnemyCollision(
  player: IPlayer,
  enemy: IEnemy,
  collision: ICollision
) {
  player.location.subtract({
    x: 0,
    y: collision.intersection.height,
  });
  player.applyImpulse(
    physics.bumpEnemyForce.subtract({ x: 0, y: player.velocity.y })
  );
  enemy.stomp();

  // StatManager.instance.gainPoints(collision.intersection, 'handleTopPlayerEnemyCollision')
  // SoundManager.instance.playSoundEffect('handleTopPlayerEnemyCollision')
}

function handleNonTopPlayerEnemyCollision(
  player: IPlayer,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  enemy: IEnemy,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  collision: ICollision
) {
  player.takeDamage();
}

function handleFlippingPlayerEnemyCollision(
  player: IPlayer,
  enemy: IEnemy,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  collision: ICollision
) {
  enemy.flip();

  // StatManager.instance.gainPoints(collision.intersection, 'handleFlippingPlayerEnemyCollision');
  // SoundManager.instance.playSoundEffect('handleFlippingPlayerEnemyCollision')
}

function handleDisarmingPlayerEnemyCollision(
  player: IPlayer,
  enemy: IEnemy,
  collision: ICollision
) {
  player.location.subtract({
    x: 0,
    y: collision.intersection.height,
  });
  player.applyImpulse(
    physics.bumpEnemyForce.subtract({ x: 0, y: player.velocity.y })
  );
  enemy.disarm();

  // StatManager.instance.gainPoints(collision.intersection, 'handleDisarmingPlayerEnemyCollision');
  // SoundManager.instance.playSoundEffect('handleDisarmingPlayerEnemyCollision')
}

function handleTopPlayerShellCollision(
  player: IPlayer,
  enemy: IEnemy,
  collision: ICollision
) {
  player.location.subtract({
    x: 0,
    y: collision.intersection.height,
  });
  player.applyImpulse(
    physics.bumpEnemyForce.subtract({ x: 0, y: player.velocity.y })
  );

  if (Math.abs(enemy.velocity.x) >= physics.shellSpeed) {
    enemy.stomp();
  } else {
    enemy.applyImpulse(
      player.hitbox.centerX > enemy.hitbox.centerX
        ? new Phaser.Math.Vector2(-physics.shellSpeed, 0)
        : new Phaser.Math.Vector2(physics.shellSpeed, 0)
    );
  }

  // StatManager.instance.gainPoints(collision.intersection, 'handleTopPlayerShellCollision');
  // SoundManager.instance.playSoundEffect('handleTopPlayerShellCollision')
}

function handleLeftPlayerShellCollision(
  player: IPlayer,
  enemy: IEnemy,
  collision: ICollision
) {
  player.location.add({
    x: collision.intersection.width,
    y: 0,
  });

  if (Math.abs(enemy.velocity.x) >= physics.shellSpeed) {
    player.takeDamage();
  } else {
    enemy.applyImpulse(new Phaser.Math.Vector2(-physics.shellSpeed, 0));
  }

  // StatManager.instance.gainPoints(collision.intersection, 'handleLeftPlayerShellCollision');
  // SoundManager.instance.playSoundEffect('handleLeftPlayerShellCollision')
}

function handleRightPlayerShellCollision(
  player: IPlayer,
  enemy: IEnemy,
  collision: ICollision
) {
  player.location.subtract({
    x: collision.intersection.width,
    y: 0,
  });

  if (Math.abs(enemy.velocity.x) >= physics.shellSpeed) {
    player.takeDamage();
  } else {
    enemy.applyImpulse(new Phaser.Math.Vector2(physics.shellSpeed, 0));
  }

  // StatManager.instance.gainPoints(collision.intersection, 'handleLeftPlayerShellCollision');
  // SoundManager.instance.playSoundEffect('handleLeftPlayerShellCollision')
}

const playerEnemyCollisionCommands: {
  [key: string]: (
    player: IPlayer,
    enemy: IEnemy,
    collision: ICollision
  ) => void;
} = {
  'Mario,Goomba,WalkingEnemyState,TopCollision': handleTopPlayerEnemyCollision,
  'Mario,Goomba,WalkingEnemyState,BottomCollision':
    handleNonTopPlayerEnemyCollision,
  'Mario,Goomba,WalkingEnemyState,LeftCollision':
    handleNonTopPlayerEnemyCollision,
  'Mario,Goomba,WalkingEnemyState,RightCollision':
    handleNonTopPlayerEnemyCollision,

  'Mario,Koopa,WalkingEnemyState,TopCollision':
    handleDisarmingPlayerEnemyCollision,
  'Mario,Koopa,WalkingEnemyState,BottomCollision':
    handleNonTopPlayerEnemyCollision,
  'Mario,Koopa,WalkingEnemyState,LeftCollision':
    handleNonTopPlayerEnemyCollision,
  'Mario,Koopa,WalkingEnemyState,RightCollision':
    handleNonTopPlayerEnemyCollision,

  'Mario,Koopa,ShellEnemyState,TopCollision': handleTopPlayerShellCollision,
  'Mario,Koopa,ShellEnemyState,BottomCollision':
    handleNonTopPlayerEnemyCollision,
  'Mario,Koopa,ShellEnemyState,LeftCollision': handleLeftPlayerShellCollision,
  'Mario,Koopa,ShellEnemyState,RightCollision': handleRightPlayerShellCollision,

  'StarMario,Goomba,WalkingEnemyState,TopCollision':
    handleFlippingPlayerEnemyCollision,
  'StarMario,Goomba,WalkingEnemyState,BottomCollision':
    handleFlippingPlayerEnemyCollision,
  'StarMario,Goomba,WalkingEnemyState,LeftCollision':
    handleFlippingPlayerEnemyCollision,
  'StarMario,Goomba,WalkingEnemyState,RightCollision':
    handleFlippingPlayerEnemyCollision,

  'StarMario,Koopa,WalkingEnemyState,TopCollision':
    handleFlippingPlayerEnemyCollision,
  'StarMario,Koopa,WalkingEnemyState,BottomCollision':
    handleFlippingPlayerEnemyCollision,
  'StarMario,Koopa,WalkingEnemyState,LeftCollision':
    handleFlippingPlayerEnemyCollision,
  'StarMario,Koopa,WalkingEnemyState,RightCollision':
    handleFlippingPlayerEnemyCollision,

  'StarMario,Koopa,ShellEnemyState,TopCollision':
    handleFlippingPlayerEnemyCollision,
  'StarMario,Koopa,ShellEnemyState,BottomCollision':
    handleFlippingPlayerEnemyCollision,
  'StarMario,Koopa,ShellEnemyState,LeftCollision':
    handleFlippingPlayerEnemyCollision,
  'StarMario,Koopa,ShellEnemyState,RightCollision':
    handleFlippingPlayerEnemyCollision,

  'BlinkingMario,Goomba,WalkingEnemyState,TopCollision':
    handleTopPlayerEnemyCollision,
  'BlinkingMario,Koopa,WalkingEnemyState,TopCollision':
    handleDisarmingPlayerEnemyCollision,
  'BlinkingMario,Koopa,ShellEnemyState,TopCollision':
    handleTopPlayerEnemyCollision,

  'Goomba,Mario,WalkingEnemyState,TopCollision':
    handleNonTopPlayerEnemyCollision,
  'Goomba,Mario,WalkingEnemyState,BottomCollision':
    handleTopPlayerEnemyCollision,
  'Goomba,Mario,WalkingEnemyState,LeftCollision':
    handleNonTopPlayerEnemyCollision,
  'Goomba,Mario,WalkingEnemyState,RightCollision':
    handleNonTopPlayerEnemyCollision,

  'Koopa,Mario,WalkingEnemyState,TopCollision':
    handleNonTopPlayerEnemyCollision,
  'Koopa,Mario,WalkingEnemyState,BottomCollision':
    handleDisarmingPlayerEnemyCollision,
  'Koopa,Mario,WalkingEnemyState,LeftCollision':
    handleNonTopPlayerEnemyCollision,
  'Koopa,Mario,WalkingEnemyState,RightCollision':
    handleNonTopPlayerEnemyCollision,

  'Koopa,Mario,ShellEnemyState,TopCollision': handleNonTopPlayerEnemyCollision,
  'Koopa,Mario,ShellEnemyState,BottomCollision': handleTopPlayerEnemyCollision,
  'Koopa,Mario,ShellEnemyState,LeftCollision': handleNonTopPlayerEnemyCollision,
  'Koopa,Mario,ShellEnemyState,RightCollision':
    handleNonTopPlayerEnemyCollision,

  'Goomba,StarMario,WalkingEnemyState,TopCollision':
    handleFlippingPlayerEnemyCollision,
  'Goomba,StarMario,WalkingEnemyState,BottomCollision':
    handleFlippingPlayerEnemyCollision,
  'Goomba,StarMario,WalkingEnemyState,LeftCollision':
    handleFlippingPlayerEnemyCollision,
  'Goomba,StarMario,WalkingEnemyState,RightCollision':
    handleFlippingPlayerEnemyCollision,

  'Koopa,StarMario,WalkingEnemyState,TopCollision':
    handleFlippingPlayerEnemyCollision,
  'Koopa,StarMario,WalkingEnemyState,BottomCollision':
    handleFlippingPlayerEnemyCollision,
  'Koopa,StarMario,WalkingEnemyState,LeftCollision':
    handleFlippingPlayerEnemyCollision,
  'Koopa,StarMario,WalkingEnemyState,RightCollision':
    handleFlippingPlayerEnemyCollision,

  'Koopa,StarMario,ShellEnemyState,TopCollision':
    handleFlippingPlayerEnemyCollision,
  'Koopa,StarMario,ShellEnemyState,BottomCollision':
    handleFlippingPlayerEnemyCollision,
  'Koopa,StarMario,ShellEnemyState,LeftCollision':
    handleFlippingPlayerEnemyCollision,
  'Koopa,StarMario,ShellEnemyState,RightCollision':
    handleFlippingPlayerEnemyCollision,

  'Goomba,BlinkingMario,WalkingEnemyState,BottomCollision':
    handleTopPlayerEnemyCollision,
  'Koopa,BlinkingMario,WalkingEnemyState,BottomCollision':
    handleDisarmingPlayerEnemyCollision, // TODO: in og, this was stomp and below was disarm
  'Koopa,BlinkingMario,ShellEnemyState,BottomCollision':
    handleTopPlayerEnemyCollision,
};
