import * as PIXI from 'pixi.js';
import { Game } from '../constants'
import { lerp, backout,  findDuplicates, countItemInArray } from '../utils';
import Reel from './Reel';

export default class ReelContainer {
	constructor(onChangeGameState) {
		this.x = 0;
        this.y = 52;
        this.onChangeGameState = onChangeGameState;
		this.width = Game.Reels.Width;
		this.height =  Game.Reels.Width;
		this.delayStop = 1000;
		this.columnPadding = 78;
        this.reelPositions = 5;
        this.reelIds = Game.reelIds;
		this.reels = Array.from({ length: 3 }, () => new Reel(this.shuffleReelIds(), this.setWildId.bind(this)));
		this.container = new PIXI.Container();
		this.container.x = this.x;
        this.container.y = this.y;

        this.addReel();
	}

    shuffleReelIds() {
		return this.reelIds.sort(() => 0.5 - Math.random());
    }
    
	addReel() {
        let i;

        
		for (i = 0; i < this.reels.length; i++) {
			let reel = this.reels[i];
			reel.delayStop = this.delayStop * i;
            reel.container.position.x =  i * Game.Reels.Width + 82;

            this.container.addChild(reel.container);
        }
	}
	
	rotate(fn) {
		let i;
		this.finalResult = [];

		if (this.text && this.text.text) {
			this.text.text = ''
		};

		for (i = 0; i < this.reels.length; i++) {
			let reel = this.reels[i];
			let random = Math.floor(Math.random() * this.reelPositions);
			reel.startRotation(random, fn);
			this.finalResult.push(reel.result);
		}
	}

	checkResult(result) {
		let count = null,
            duplicates = findDuplicates(result, this.wildId),  // without Wild
            countWilds = countItemInArray(result, this.wildId);

        switch (countWilds) {
            case Game.countReels:
                count = -1;  // GAME OVER
                break;
            case Game.countReels - 1:
                count = 1;  // WIN
            case 0:
                if (duplicates.length == 2) count = 1;  // WIN
                break;
            case 1:
                if (duplicates.length) count = 1;  // WIN
                break;
            default:
                count = 0;
                break;
        }

        return count;
	}

	checkRows(result) {
		let middleRow = result.map(res => res.middleRow);
        
        if (this.checkResult(middleRow)) {
            this.onChangeGameState('WON')
        } else if (this.checkResult(middleRow) < 0) {
            this.onChangeGameState('LOST')
        }
    }

    setWildId(id) {
        this.wildId = id;
    }
}
