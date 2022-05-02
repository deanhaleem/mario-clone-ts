import { IUpdatable } from '../types';

export interface ISprite extends IUpdatable {
    /**
     * The hitbox of the Sprite.
     */
    size: Phaser.Math.Vector2;

    /**
     * Draws the Sprite to the screen using the scene with which the Sprite was created.
     * 
     * @param renderTexture the RenderTexture used to draw to the screen.
     * @param location where on the screen to draw the Sprite.
     */
    draw(renderTexture: Phaser.GameObjects.RenderTexture, location: Phaser.Math.Vector2): void;
  }
  
export interface SpriteDetails {
    /**
     * Depth within the scene. Lower number means further back.
     */
    layerDepth: number;

    /**
     * The delay before changing frames for animated Sprites.
     * 
     * Note: this is supposed to be how many frames to wait in a 60 fps environment.
     * It should be equal to how long (seconds or ms) to wait until updating the frame.
     * TODO: Find out why this works
     */
    frameDelay: number;

    /**
     * The delay before changing which color to use.
     * 
     * Applies when there is one animation with multiple colors, such as Star Mario.
     */
    colorTintDelay: number;

    /**
     * Scale applied to the source image.
     */
    scale: number;

    /**
     * Name of the texture from which the image is taken.
     */
    textureName: string;

    /**
     * The frames from the texture that are associated with this Sprite.
     */
    sourceFrames: Record<string, string[]>;

    /**
     * The hitbox associated with this Sprite, before scaling is applied.
     */
    sizes: { x: number, y: number }[];
  }