export class IndicatorFactory {
  public static instance = new IndicatorFactory();

  private constructor() {}

  public static createIndicator(
    pointEventIntersection: Phaser.Geom.Rectangle,
    points: number
  ) {
    // Game1.instance.unregisterGameObject(new Indicator(new Phaser.Math.Vector2(pointEventIntersection.right, pointEventIntersection.top), points))
  }
}
