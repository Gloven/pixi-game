import * as  PIXI from 'pixi.js';
import { Scene } from '../constants';

export default class WinningText {
    constructor() {
		this.container = new PIXI.Container();
		this.textStyle = {
			fontFamily: 'Arial',
			fontWeight: 'bold',
			fontSize: '76px',
			"fill": [
				"#7979c4",
				"#e1e1e1"
			],
			stroke: '#4a1850',
			strokeThickness: 5,
			wordWrap: true,
			wordWrapWidth: 440
		};

		this.createWinningContainer();
		this.container.visible = false;
		this.container.interactive = true;
	}

	createWinningContainer() {
		this.winningContainer = new PIXI.Graphics();
		this.winningContainer.beginFill(0x006400, 0.8);
		this.winningContainer.drawRect(0, 0, 660, 300);
		this.winningContainer.x = (Scene.Width / 2) - (this.winningContainer.width / 2) - 50;
		this.winningContainer.y = (Scene.Height / 2) - (this.winningContainer.height / 2);
		this.winningContainer.endFill();
      
		this.text = new PIXI.Text('', this.textStyle);
		this.text.anchor.set(0.5);
		this.text.x =  this.winningContainer.width / 2;
		this.text.y =  this.winningContainer.height / 2;
		this.winningContainer.addChild(this.text);

		this.container.addChild(this.winningContainer);
	}

	showWinningText(text) {
        if (text) this.text.text = text;
        this.container.visible = true;
	}

	hideWinningText() {
		this.container.visible = false;
	}
}