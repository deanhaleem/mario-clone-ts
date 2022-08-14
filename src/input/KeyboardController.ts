import { IController, KeyboardParam } from './types';

export class KeyboardController implements IController {
  private readonly keyboard: Phaser.Input.Keyboard.KeyboardPlugin;
  private readonly keyDownCommands: Record<string, () => void> = {};
  private readonly keyUpCommands: Record<string, () => void> = {};
  private readonly nonHoldableKeys: string[] = [];
  private previouslyPressedKeys: string[] = [];

  constructor(
    keyboard: Phaser.Input.Keyboard.KeyboardPlugin,
    ...args: KeyboardParam[]
  ) {
    this.keyboard = keyboard;
    args.forEach((arg) => {
      this.keyDownCommands[arg.key] = arg.keyDownCommand;
      this.keyUpCommands[arg.key] = arg.keyUpCommand;

      if (!arg.canBeHeld) {
        this.nonHoldableKeys.push(arg.key);
      }
    });
  }

  public update(): void {
    const currentlyPressedKeys = this.keyboard.keys
      .filter((key) => key.isDown)
      .map((key) => key.keyCode.toString());

    Object.keys(this.keyUpCommands).forEach((key) => {
      if (!currentlyPressedKeys.includes(key)) {
        this.keyUpCommands[key]();
      }
    });

    currentlyPressedKeys.forEach((key) => {
      if (key in this.keyDownCommands) {
        if (
          !this.nonHoldableKeys.includes(key) ||
          !this.previouslyPressedKeys.includes(key)
        ) {
          this.keyDownCommands[key]();
        }
      }
    });

    this.previouslyPressedKeys = currentlyPressedKeys;
  }
}
