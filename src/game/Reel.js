import * as PIXI from "pixi.js";
import { REEL } from '../constants';
export default class Reel {
	constructor(turn, setWildId) {
        this.setWildId = setWildId;
		this.width = REEL.w;
		this.height = REEL.h;
		this.cached = {};
		this.animation = true;
		this.position = {
			x: 0,
			y: 0
		};
		this.delayStop = 0;
		this.singleReel = [];
		
		this.container = new PIXI.Container();
		this.container.position.x = this.position.x;
        this.container.position.y = this.position.y;

        this.init(turn);
    }
    

    init(turn) {
        this.generateSlotTextures();
		this.createTurn(turn);
        this.createReels();
    }
    
    generateSlotTextures() {
        const resources = PIXI.Loader.shared.resources.assets.data;
        let id = 0;

        for (const key in resources.slotTextures) {
            if (resources.slotTextures.hasOwnProperty(key)) {
                const element = resources.slotTextures[key];

                this.singleReel.push({id, texture: PIXI.Texture.from(element)})

                if (key === 'WILD') this.setWildId(id);
                id++;
            }
        }
    }

	createTurn(turn) {
		let i;
		let turned = [];
		for (i = 0; i < turn.length; i++) {
			this.singleReel.forEach(item => {
				if (item.id == turn[i]) turned.push(item)
			})
        }
        
		this.singleReel = turned;
	}
	
	createReels() {
		let i;
		let item;
		for(i = 0; i < this.singleReel.length; i++) {
			item = new PIXI.Sprite(this.singleReel[i].texture);
            item.position.y = i * this.height;
            item.scale.x = item.scale.y = 0.85;
			this.cached[`id_${this.singleReel[i].id}`] = item;
			this.container.addChild(item);
		}
	}
	
	startRotation(randomReel, callback) {
		this.animation = true;
		this.selected = randomReel;
		this.stopAnimation()
		this.startAnimation(randomReel, callback);
	}

	startAnimation(reel, callback) {
		let selectedReel = this.cached[`id_${reel}`].position.y;
		let i;

		if (
			!this.animation &&
			selectedReel === this.height
		) {
			callback();
			return false;
		}
		
		for (i = 0; i < this.singleReel.length; i++) {
			let current = this.cached[`id_${i}`];
			current.position.y -= REEL.step;
			if (current.position.y <= -this.height) {
				current.position.y = (this.singleReel.length - 1) * this.height;
			}
		}

		requestAnimationFrame(this.startAnimation.bind(this, reel, callback));
	}

	stopAnimation() {
		let delay = 3000 + this.delayStop;
		setTimeout(() => this.animation = false, delay);
	}

	get result() {
        let result = {};
		this.singleReel.forEach((item) => {
			if (item.id === this.selected) {
				result.middleRow = item.id;
			}
		})
		return result;
	}
}