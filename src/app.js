import { SCENE }     from './constants';
import Loader        from './game/Loader';
import Controller    from './game/Controller';
import LoadingBg     from './game/LoadingBg';
import Background    from './game/Background';
import ReelContainer from './game/ReelContainer';
import Button        from './game/Button';
import WinningText   from './game/WinningText';
import BlurredBg     from './game/BlurredBg';

export default class App extends Controller {
    constructor(w,h) {
        super(w,h);
        this.width = w || SCENE.Width;
        this.height = h || SCENE.Height;

        this.createLoadingBg();
        new Loader(this.init.bind(this));
    }

    init() {
        this.loadingBg.loadingWrapper.visible = false;
        this.createScene();
		this.createReels();
        this.createButton();
        this.createWinnig();
        this.createBlurredBg();
    }

    createLoadingBg() {
		this.loadingBg = new LoadingBg(this.width, this.height);
		this.stageAdd(this.loadingBg.loadingWrapper);
    }

	createScene() {
		this.background = new Background(this.handleBgOnClick.bind(this));
		this.stageAdd(this.background.container);
	}

	createReels() {
        this.reels = new ReelContainer(this.onChangeGameState.bind(this));
		this.stageAdd(this.reels.container);
	}

	createButton() {
        const buttonPositin = { x: this.width - 86, y: this.height / 2 };
		this.button = new Button(this.onStartSpin.bind(this), buttonPositin);
        this.stageAdd(this.button.container);
    }

    createWinnig() {
        this.winning = new WinningText();
        this.stageAdd(this.winning.container);
    }

    createBlurredBg() {
        this.blurredBg = new BlurredBg();
        this.stageAdd(this.blurredBg.container);
    }
};
