export interface IUpdatable {
  /**
   * Called once per game step while the scene is running.
   *
   * @param time The current time.
   * @param delta The delta time in ms since the last frame.
   */
  update(time: number, delta: number): void;
}

export type Constructor<T> = { new (...args: any[]): T };
