import * as PIXI from 'pixi.js';
import { Scene } from '../constants';

export default class BlurredBg {
    constructor() {
        var blur = new PIXI.filters.BlurFilter(60,10)

        this.container = new PIXI.Container();
        
        this.bottomRectangle = new BlurredRectangle(
            {color:0x006400, opacity: 0.65},
            {x: 0, y:  Scene.Height - 220 + 40 },
            blur,
            this.container
        )

        this.topRectangle = new BlurredRectangle(
            {color:0xffffff, opacity: 0.35},
            {x: 0, y: 0 },
            blur,
            this.container
        )
    }

}


class BlurredRectangle{
    constructor(fill, position, blur, container) {
        this.rect = new PIXI.Graphics();
		this.rect.beginFill(fill.color, fill.opacity);
		this.rect.drawRect(position.x, position.y, Scene.Width, 220);
        this.rect.endFill();
        
        this.rect.filters = [blur];
        container.addChild(this.rect);
    }
}