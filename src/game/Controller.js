import * as PIXI from 'pixi.js';
import { Game } from '../constants'

export default class Controller {
    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.gameOver = false;

        this.stopCount = 0;

        this.canvas = this.getCanvasEl('game');
        this.setCanvasSize();
        this.app = this.createPixiApp({
            view: this.canvas,
            width: this.width,
            height: this.height
        });
    }

    setCanvasSize() {
        this.canvas.height = this.width;
        this.canvas.width = this.height;
    }

    createPixiApp(config) {
        return new PIXI.Application(config);
    }

    getCanvasEl(id) {
        const canvas = document.getElementById(id) || null;

        if (!canvas) {
            throw new Error(`Canvas with specified id ${id} not found.`);
        }

        return canvas;
    }


    handleBgOnClick(e) {
        if (this.gameOver) this.handleStartGame();
        e.stopPropagation();
    }

    onStartSpin() {
        this.stopCount = 0;
        this.reels.rotate(this.onEndSpin.bind(this));
    }
    
    onChangeGameState (type) {
        switch (type) {
            case 'WON':
                this.handleGameOver('You won!')
                break;
            case 'LOST':
                this.handleGameOver('You lost')
                break;
            default:
                break;
        }
    }

    handleGameOver(text) {
        this.gameOver = true;
        this.button.changeBtnState(false);
        this.winning.showWinningText(text);

        setTimeout(this.handleStartGame.bind(this), Game.winTextDealy)
    }

    handleStartGame() {
        this.gameOver = false;
        this.button.changeBtnState(true);
        this.winning.hideWinningText();
    }

	onEndSpin() {
        this.stopCount++;
		if (this.stopCount === 3) {
			this.button.changeBtnState(true);
            this.reels.checkRows(this.reels.finalResult)
           
		}
	}

    stageAdd(stage) {
        this.app.stage.addChild(stage);
    }
}
