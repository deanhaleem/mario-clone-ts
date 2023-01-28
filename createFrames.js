const fs = require('fs')

const sprites = require('./SpriteRegistrars.json')

const marioFrames = [];
const blockFrames = [];
const enemyFrames = [];
const itemFrames = [];
const miscFrames = [];
const sceneryFrames = [];

const json = {}

const output = {};

const atlasOutput = [];

for (const key in sprites) {
    const sprite = sprites[key]
    const sourceFrames = sprite.SourceFrames;
    Object.keys(sourceFrames).forEach((sf, index) => {
        const sourceFrame = sourceFrames[sf];
        sprite.SourceFrames[sf] = sourceFrame.map((frame, index2) => {
            if (sprite.TextureName === 'blocks') {
            const atlasFrame = {
                "filename": `${key}-${index2}-${index}`,
                "frame": { "x": frame.X, "y": frame.Y, "w": frame.Width, "h": frame.Height },
                "spriteSourceSize": { "x": 0, "y": 0, "w": frame.Width, "h": frame.Height },
                "sourceSize": {
                    "w": frame.Width,
                    "h": frame.Height
                },
                "pivot": {
                    "x": 0.5,
                    "y": 1
                }
            }
        

            atlasOutput.push(atlasFrame)
        }

            return `${key}-${index2}-${index}`;
        })
    })

    const sizes = sprite.Sizes;
    sprite.Sizes = sizes.map((size) => {
        return { x: size.X, y: size.Y }
    })

    const frame = {
        layerDepth: sprite.LayerDepth,
        frameDelay: sprite.FrameDelay,
        colorTintDelay: sprite.ColorTintDelay,
        scale: sprite.Scale,
        textureName: getTextureName(sprite.TextureName),
        sourceFrames: sprite.SourceFrames,
        sizes: sprite.Sizes
    }
    output[key] = frame;
    

}

function getTextureName(name) {
    if (name === 'mario') {
        return 'mario'
    }

    if (name === 'blocks') {
        return 'blocks'
    }

    if (name === 'items') {
        return 'items'
    }

    if (name === 'scenery') {
        return 'scenery'
    }

    if (name === 'enemies') {
        return 'enemies'
    }

    if (name === 'extras') {
        return 'misc'
    }
}

console.log(json)

fs.writeFile('./temp.json', JSON.stringify(atlasOutput), (err) => {
    if (err) throw err
    console.log('done')
})