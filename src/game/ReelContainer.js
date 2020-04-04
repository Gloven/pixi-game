import * as PIXI from 'pixi.js';
import { GAME, REEL_CONTAINER } from '../constants'
import { findDuplicates, countItemInArray } from '../utils';
import Reel from './Reel';

export default class ReelContainer {
	constructor(onChangeGameState) {
		this.x = 0;
        this.y = 52;
        this.onChangeGameState = onChangeGameState;
		this.width = GAME.Reels.Width;
		this.height =  GAME.Reels.Width;
		this.delayStop = REEL_CONTAINER.delayStop;
		this.columnPadding = REEL_CONTAINER.columnPadding;
        this.reelPositions = REEL_CONTAINER.reelPositions;
        this.reelIds = GAME.reelIds;
		this.reels = Array.from({ length: GAME.countReels }, () => new Reel(this.shuffleReelIds(), this.setWildId.bind(this)));
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
            reel.container.position.x = i * GAME.Reels.Width + this.columnPadding;

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
            case GAME.countReels:
                count = -1;  // GAME OVER
                break;
            case GAME.countReels - 1:
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
