/**
 * This method is called once per game step while the scene is running.
 *
 * @param time The current time.
 * @param delta The delta time in ms since the last frame..
 */
export interface IUpdatable {
  update(time: number, delta: number): void;
}
