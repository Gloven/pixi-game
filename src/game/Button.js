import * as PIXI from 'pixi.js';

export default class Button {
    constructor(onStartGame, position) {
        this.container = new PIXI.Container();
        this.position = position;
        this.isActive = true;
        this.onStartGame = onStartGame;
        this.initialize();
    }

    initialize() {
        const resources = PIXI.Loader.shared.resources.assets.data;

		this.activeBtn = resources.other['activeBtn'];
		this.inactiveBtn = resources.other['inactiveBtn'];
		
		this.container.position.x = this.position.x;
        this.container.position.y = this.position.y;
        
        const btnTexture = PIXI.Texture.from(this.activeBtn);
    
        this.button = new PIXI.Sprite(btnTexture);
    
        this.button.anchor.set(0.5);
        this.container.buttonMode = this.isActive;
        this.container.interactive = this.isActive;
		
        this.container.addChild(this.button);
        
        this.container.addListener('pointerdown', this.handleOnClick.bind(this));
	}

    handleOnClick() {
        if (!this.isActive) return;

        this.changeBtnState(false);

        this.onStartGame(this.changeBtnState.bind(this))
    }

    changeBtnState(state) {
        this.isActive = state;

        this.button.texture = PIXI.Texture.from(this.isActive ? this.activeBtn : this.inactiveBtn);
    }
}
