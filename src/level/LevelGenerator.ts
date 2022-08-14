import { GameObjectGenerator } from './GameObjectGenerator';
import { ILevel, ILevelGenerator } from './types';

export class LevelGenerator implements ILevelGenerator {
  private readonly gameObjectGenerator: GameObjectGenerator;

  constructor(level: ILevel) {
    this.gameObjectGenerator = new GameObjectGenerator(level);
  }

  public loadContent(): void {
    this.gameObjectGenerator.loadContent();
  }

  public generateLevel() {
    this.gameObjectGenerator.generateGameObjects();
  }
}
