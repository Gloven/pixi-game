import * as  PIXI from 'pixi.js';

export default class Background {
    constructor(onClick) {
        const resources = PIXI.Loader.shared.resources.assets.data;
        this.container  = new PIXI.Container();
		this.background = PIXI.Texture.from(resources.other["Background"]);
		this.setBackground();

		this.container.interactive = true;
        this.container.addListener('pointerdown', onClick.bind(this));
	}
	
	setBackground() {
		const BG = new PIXI.Sprite(this.background);
		this.container.addChild(BG);
	}
}