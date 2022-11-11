import { physics } from '../../../utils/constants/physics';
import { IItem } from '../types';
import { ItemState } from './ItemState';

export class SpawningItemState extends ItemState {
  // private readonly itemStateAfterSpawn: ConstructorFunction;

  constructor(item: IItem) {
    // TODO: item type
    super(item);

    this.item.applyImpulse(physics.spawningItemImpulse);

    // this.itemStateAfterSpawn = ...;

    // TimedActionManager.Instance.registerTimedAction(null, setStateAfterSpawn, timers.itemSpawn);
    // SoundManager.instance.playSoundEffect('spawningItem');
  }

  private setStateAfterSpawn() {
    // this.item.itemState = itemStateAfterSpawn(this.item);
    // Game1.instance.registerGameObject(this.item);
  }
}
