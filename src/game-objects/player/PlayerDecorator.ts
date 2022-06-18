import { Directions } from '../../physics/types';
import { physics } from '../../utils/constants/Physics';
import { KinematicGameObject } from '../KinematicGameObject';
import { IActionState, IPowerUpState } from './state/types';
import { IPlayer } from './types';

export abstract class PlayerDecorator
  extends KinematicGameObject
  implements IPlayer
{
  private _decorationTimer: number;

  protected decoratedPlayer: IPlayer;

  protected constructor(player: IPlayer, time: number) {
    super(player.location, physics.maxPlayerVelocity);

    this.decoratedPlayer = player;
    this.decorationTimer = time;
  }

  public removeDecorator() {
    // Game1.instance.player = this.decoratedPlayer;

    this.decoratedPlayer.decorate();
    this.decorationTimer = 0;
  }

  public override update(time: number, delta: number): void {
    this.decoratedPlayer.update(delta, time);
    this.decorationTimer--;
  }

  public override draw(renderTexture: Phaser.GameObjects.RenderTexture): void {
    this.decoratedPlayer.draw(renderTexture);
  }

  public stand(): void {
    this.decoratedPlayer.stand();
  }

  public jump(): void {
    this.decoratedPlayer.jump();
  }

  public walkRight(): void {
    this.decoratedPlayer.walkRight();
  }

  public walkLeft(): void {
    this.decoratedPlayer.walkLeft();
  }

  public crouch(): void {
    this.decoratedPlayer.crouch();
  }

  public run(): void {
    this.decoratedPlayer.run();
  }

  public attack(): void {
    this.decoratedPlayer.attack();
  }

  public stopRunning(): void {
    this.decoratedPlayer.stopRunning();
  }

  public stopMovingRight(): void {
    this.decoratedPlayer.stopMovingRight();
  }

  public stopMovingLeft(): void {
    this.decoratedPlayer.stopMovingLeft();
  }

  public stopCrouching(): void {
    this.decoratedPlayer.stopCrouching();
  }

  public stopJumping(): void {
    this.decoratedPlayer.stopJumping();
  }

  public takeDamage(): void {
    this.decoratedPlayer.takeDamage();
  }

  public upgrade(): void {
    this.decoratedPlayer.upgrade();
  }

  public decorate(): void {
    this.decoratedPlayer.decorate();
  }

  public turnDead(): void {
    this.decoratedPlayer.turnDead();
  }

  public winLevel(): void {
    this.decoratedPlayer.winLevel();
  }

  public override setSprite(spriteName: string): void {
    this.decoratedPlayer.setSprite(spriteName);
  }

  public override applyImpulse(impulse: Phaser.Math.Vector2): void {
    this.decoratedPlayer.applyImpulse(impulse);
  }

  public override applyForce(force: Phaser.Math.Vector2): void {
    this.decoratedPlayer.applyForce(force);
  }

  public override cutXVelocity(): void {
    this.decoratedPlayer.cutXVelocity();
  }

  public override cutYVelocity(): void {
    this.decoratedPlayer.cutYVelocity();
  }

  public override land(): void {
    this.decoratedPlayer.land();
  }

  public override fall(): void {
    this.decoratedPlayer.fall();
  }

  public override changeDirection(): void {
    this.decoratedPlayer.changeDirection();
  }

  public override setMaxVelocity(velocity: Phaser.Math.Vector2): void {
    this.decoratedPlayer.setMaxVelocity(velocity);
  }

  public warp(
    location: Phaser.Math.Vector2,
    velocity: Phaser.Math.Vector2
  ): void {
    this.decoratedPlayer.warp(location, velocity);
  }

  protected get decorationTimer() {
    return this._decorationTimer;
  }

  protected set decorationTimer(decorationTimer: number) {
    this._decorationTimer = decorationTimer;
    if (this._decorationTimer === 0) {
      this.removeDecorator();
    }
  }

  public override get location() {
    return this.decoratedPlayer.location;
  }

  public override set location(location: Phaser.Math.Vector2) {
    this.decoratedPlayer.location = location;
  }

  public override get direction(): Directions {
    return this.decoratedPlayer.direction;
  }

  public set direction(direction: Directions) {
    this.decoratedPlayer.direction = direction;
  }

  public override get hitbox(): Phaser.Geom.Rectangle {
    return this.decoratedPlayer.hitbox;
  }

  public override get extendedHitbox(): Phaser.Geom.Rectangle {
    return this.decoratedPlayer.extendedHitbox;
  }

  public override get velocity(): Phaser.Math.Vector2 {
    return this.decoratedPlayer.velocity;
  }

  public set velocity(velocity: Phaser.Math.Vector2) {
    this.decoratedPlayer.velocity = velocity;
  }

  public override get acceleration(): Phaser.Math.Vector2 {
    return this.decoratedPlayer.acceleration;
  }

  public set acceleration(acceleration: Phaser.Math.Vector2) {
    this.decoratedPlayer.acceleration = acceleration;
  }

  public get canWarp(): boolean {
    return this.decoratedPlayer.canWarp;
  }

  public set canWarp(canWarp: boolean) {
    this.decoratedPlayer.canWarp = canWarp;
  }

  public get powerUpState() {
    return this.decoratedPlayer.powerUpState;
  }

  public set powerUpState(powerUpState: IPowerUpState) {
    this.decoratedPlayer.powerUpState = powerUpState;
  }

  public get actionState() {
    return this.decoratedPlayer.actionState;
  }

  public set actionState(actionState: IActionState) {
    this.decoratedPlayer.actionState = actionState;
  }
}
