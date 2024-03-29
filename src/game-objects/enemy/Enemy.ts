import { Directions } from '../../physics/types';
import { physics } from '../../utils/constants/physics';
import { KinematicGameObject } from '../KinematicGameObject';
import { IEnemyState } from './state/types';
import { IEnemy } from './types';

export abstract class Enemy extends KinematicGameObject implements IEnemy {
  private _enemyState: IEnemyState;

  protected constructor(location: Phaser.Math.Vector2) {
    super(location, physics.maxEnemyVelocity);

    // TODO: Figure out how to have sleeping enemy state here

    // super.direction = Directions.Left;
  }

  public update(time: number, delta: number): void {
    this.enemyState.update(time, delta);

    super.update(time, delta);
  }

  public stomp(): void {
    this.enemyState.stomp();
  }

  public flip(): void {
    this.enemyState.flip();
  }

  public disarm(): void {
    this.enemyState.disarm();
  }

  public wakeUp(): void {
    this.enemyState.wakeUp();
  }

  protected override get spriteName() {
    // TODO: Clean up
    const spriteDict: Record<string, string> = {
      LeftSleepingGoomba: 'WalkingGoomba',
      RightSleepingGoomba: 'WalkingGoomba',
      LeftWalkingGoomba: 'WalkingGoomba',
      RightWalkingGoomba: 'WalkingGoomba',
      LeftStompedGoomba: 'StompedGoomba',
      RightStompedGoomba: 'StompedGoomba',
      LeftFlippedGoomba: 'FlippedGoomba',
      RightFlippedGoomba: 'FlippedGoomba',

      LeftSleepingKoopa: 'LeftWalkingKoopa',
      RightSleepingKoopa: 'LeftWalkingKoopa',
      LeftWalkingKoopa: 'LeftWalkingKoopa',
      RightWalkingKoopa: 'RightWalkingKoopa',
      LeftStompedKoopa: 'StompedKoopa',
      RightStompedKoopa: 'StompedKoopa',
      LeftShellKoopa: 'StompedKoopa',
      RightShellKoopa: 'StompedKoopa',
      LeftFlippedKoopa: 'FlippedKoopa',
      RightFlippedKoopa: 'FlippedKoopa',
    };

    return spriteDict[
      `${Directions[this.direction]}${this._enemyState.spriteName}${
        this.constructor.name
      }`
    ];
  }

  public get enemyState() {
    return this._enemyState;
  }

  public set enemyState(enemyState: IEnemyState) {
    this._enemyState = enemyState;
    this.setSprite(this.spriteName);
  }

  public override get collisionDetails() {
    return {
      interface: 'IEnemy',
      class: this.constructor.name,
      kinematic: true,
    };
  }
}
