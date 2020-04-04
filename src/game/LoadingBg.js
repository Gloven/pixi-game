import * as PIXI from 'pixi.js';

export default class LodingBg {
    constructor(width, height) {
        this.text = 'Loading';
        this.bgColor = 0x000;
        this.width = width;
        this.height = height;

        this.loadingWrapper = new PIXI.Graphics();

        this.textStyle = new PIXI.TextStyle({
            fontSize: 40,
            fontWeight: 'bold',
            wordWrap: true,
            fill: 'white'
        });
    
        this.loadingWrapper.beginFill(0x000);
        this.loadingWrapper.drawRect();
        this.loadingWrapper.endFill();
    
        this.loadingText = new PIXI.Text(this.text, this.textStyle);

        this.loadingText.anchor.set(0.5);

        this.loadingText.x = this.width / 2;
        this.loadingText.y = this.height / 2;
    
        this.loadingWrapper.addChild(this.loadingText);
    }

}