export interface IController {
  update(): void;
}

export type KeyboardParam = {
  key: string;
  keyDownCommand: () => void;
  keyUpCommand: () => void;
  canBeHeld: boolean;
};
