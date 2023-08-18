import { _decorator, Component, Label, Node, Button, Sprite, director, find, log } from 'cc';
import { ScoreController } from './ScoreController';
import { Data, SCENE_NAME } from './Data';
import { StoreAPI } from './StoreAPI';
const { ccclass, property } = _decorator;

@ccclass('ResultController')
export class ResultController extends Component {
    @property({type: ScoreController})
    private score: ScoreController = null;
    
    @property({type: Label})
    private highScore: Label;

    @property({type: Label})
    private urScore: Label;

    @property({type: Button})
    private againBtn: Button;

    @property({type: Button})
    private settingBtn: Button;

    @property({type: Button})
    private menuBtn: Button;

    @property({type: Sprite})
    private playerDecor: Sprite;

    @property({type: Sprite})
    private birdDecor: Sprite;

    @property({type: Label})
    private resultText: Label;

    @property({type: Sprite})
    private boardResult: Sprite;

    @property({type: Sprite})
    private redFlag: Sprite;

    private GameClient;
    gameClient: any;

    protected onLoad(): void {
        this.againBtn.interactable = true;
        this.settingBtn.interactable = true;
        this.menuBtn.interactable = true;
    }

    public showResult(){
        try {
            let maxScore = parseInt(localStorage.getItem(Data.highscore))
            this.highScore.string = `High score: ${maxScore}`;
            this.urScore.string = `Your score: ${this.score.curScore}`;
            this.node.active = true;
        } catch (error) {
            this.highScore.string = `High score: ${Data.highScoreStatic}`;
            this.urScore.string = `Your score: ${this.score.curScore}`;
            this.node.active = true;
        }
    }

    private hideResult(){
        this.node.active = false;
    }   

    private onClickMenu() : void {
        this.interactableBtn();
        director.loadScene(SCENE_NAME.Entry);
    }

    private onClickSetting(): void {
        this.interactableBtn();
        director.loadScene(SCENE_NAME.Setting);
    }

    private onClickPlayAgain(): void {
        this.interactableBtn();
    }

    private interactableBtn(): void {
        this.menuBtn.interactable = false;
        this.againBtn.interactable = false;
        this.settingBtn.interactable = false;
    }
}


