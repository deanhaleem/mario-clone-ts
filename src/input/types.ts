export interface IController {
  update(): void;
}

export interface ICommand {
  execute(): void;
}

export type KeyboardParam = {
  key: string;
  keyDownCommand: ICommand;
  keyUpCommand: ICommand;
  canBeHeld: boolean;
};
