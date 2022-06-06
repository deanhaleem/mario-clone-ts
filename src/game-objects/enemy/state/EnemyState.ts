import { IEnemy } from '../types';
import { FlippedEnemyState } from './FlippedEnemyState';
import { ShellEnemyState } from './ShellEnemyState';
import { IEnemyState } from './types';

export abstract class EnemyState implements IEnemyState {
  protected enemy: IEnemy;

  public abstract spriteName: string;

  protected constructor(enemy: IEnemy) {
    this.enemy = enemy;
  }

  public stomp(): void {
    this.enemy.enemyState = new FlippedEnemyState(this.enemy);
  }

  public flip(): void {
    this.enemy.enemyState = new FlippedEnemyState(this.enemy);
  }

  public disarm(): void {
    this.enemy.enemyState = new ShellEnemyState(this.enemy);
  }

  public update(time: number, delta: number): void {}
  public changeDirection(): void {}
  public wakeUp(): void {}
}
