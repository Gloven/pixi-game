import * as PIXI from 'pixi.js';
import { SCENE, BLURRED_BG } from '../constants';

export default class BlurredBg {
    constructor() {
        const { Height, bottomColor, topColor, topOpacity, bottomOpacity, bl } = BLURRED_BG;

        var blur = new PIXI.filters.BlurFilter(bl,10)

        this.container = new PIXI.Container();

        this.bottomRectangle = new BlurredRectangle(
            { color: bottomColor, opacity: bottomOpacity },
            { x: 0, y:  SCENE.Height - Height + 40},
            blur,
            this.container
        )

        this.topRectangle = new BlurredRectangle(
            { color: topColor, opacity: topOpacity },
            { x: 0, y: 0 },
            blur,
            this.container
        )
    }
}

class BlurredRectangle{
    constructor(fill, position, blur, container) {
        this.rect = new PIXI.Graphics();
		this.rect.beginFill(fill.color, fill.opacity);
		this.rect.drawRect(position.x, position.y, SCENE.Width, BLURRED_BG.Height);
        this.rect.endFill();
        
        this.rect.filters = [blur];
        container.addChild(this.rect);
    }
}