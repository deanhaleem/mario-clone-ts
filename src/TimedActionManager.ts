type TimedAction = {
  timedAction: (() => void) | null;
  postTimedAction: () => void;
  time: number;
};

export class TimedActionManager {
  private timedActions: TimedAction[] = [];

  public static instance = new TimedActionManager();

  private constructor() {}

  public update(timeSince: number, delta: number) {
    const count = this.timedActions.length;

    for (let i = 0; i < count && this.timedActions.length > 0; i++) {
      const { timedAction, postTimedAction, time } =
        this.timedActions.pop() as TimedAction;

      const updatedTime = time - delta / 1000;
      if (updatedTime <= 0) {
        postTimedAction();
      } else {
        if (timedAction) {
          timedAction();
        }
        this.timedActions.push({
          timedAction,
          postTimedAction,
          time: updatedTime,
        });
      }
    }
  }

  public registerTimedAction(
    timedAction: (() => void) | null,
    postTimedAction: () => void,
    time: number
  ) {
    this.timedActions.push({ timedAction, postTimedAction, time });
  }

  public reset() {
    this.timedActions = [];
  }
}
