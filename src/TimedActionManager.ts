type TimedAction = {
  timedAction: (() => void) | null;
  postTimedAction: () => void;
  time: number;
};

let timedActions: TimedAction[] = [];

export function registerTimedAction(
  timedAction: (() => void) | null,
  postTimedAction: () => void,
  time: number
) {
  timedActions.push({ timedAction, postTimedAction, time });
}

export function reset() {
  timedActions = [];
}

export function progressTimedActions(timeSince: number, delta: number) {
  const count = timedActions.length;

  for (let i = 0; i < count && timedActions.length > 0; i++) {
    const { timedAction, postTimedAction, time } =
      timedActions.pop() as TimedAction;

    const updatedTime = time - delta / 1000;
    if (updatedTime <= 0) {
      postTimedAction();
    } else {
      if (timedAction) {
        timedAction();
      }
      timedActions.push({
        timedAction,
        postTimedAction,
        time: updatedTime,
      });
    }
  }
}
