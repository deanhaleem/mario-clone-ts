import { ICommand } from '../types';

export abstract class Command<T> implements ICommand {
  protected receiver: T;

  protected constructor(receiver: T) {
    this.receiver = receiver;
  }

  public abstract execute(): void;
}
