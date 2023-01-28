import { ICamera, ICameraController } from './types';

export class CameraController implements ICameraController {
  private readonly camera: ICamera;

  constructor(camera: ICamera) {
    this.camera = camera;
  }

  public update(location: number, velocity: number): void {
    if (location > this.camera.location.x + this.camera.hitbox.width / 2) {
      if (velocity > 0) {
        this.camera.location.add(new Phaser.Math.Vector2(velocity, 0));
      }
    }
  }

  public setCameraLocation(location: Phaser.Math.Vector2): void {
    location;
  }
}
