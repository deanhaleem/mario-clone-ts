import { ICommand } from '../types';

export class NullCommand implements ICommand {
  public execute(): void {}
}
