import * as PIXI from 'pixi.js';

export default class Loder {
    constructor(onAssetsLoaded) {
        this.onAssetsLoaded = onAssetsLoaded;
        this.loader = PIXI.Loader.shared;
        this.loadAssets();
        this.loader.load(this.handleOnload.bind(this));
        
	}
	
	loadAssets() {
        this.loader.add('assets', 'assets/config.json')
    }

    handleOnload(loader, resources) {
        this.loadAssetsFromJson(resources.assets.data)
        this.onAssetsLoaded()
    }

    loadAssetsFromJson(resources) {
        for (const categoryName in resources) {
            if (resources.hasOwnProperty(categoryName)) {
                const category = resources[categoryName];
                for (const name in category) {
                    if (category.hasOwnProperty(name)) {
                        const path = category[name];
                        this.loader.add(name, path)
                    }
                }
            }
        }
    }
}