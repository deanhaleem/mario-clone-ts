import { physics } from '../../../utils/constants/Physics';
import { IEnemy } from '../types';
import { DeadEnemyState } from './DeadEnemyState';

export class FlippedEnemyState extends DeadEnemyState {
  public override spriteName = 'Flipped';

  constructor(enemy: IEnemy) {
    super(enemy);

    this.enemy.applyImpulse(physics.flippedEnemyImpulse);
    this.enemy.applyForce(physics.gravitationalForce);
    this.enemy.setMaxVelocity(physics.flippedEnemyMaxVelocity);
  }
}
