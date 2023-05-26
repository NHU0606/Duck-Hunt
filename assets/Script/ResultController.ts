import { _decorator, Component, Label, Node, Button, Sprite, director } from 'cc';
import { ScoreController } from './ScoreController';
const { ccclass, property } = _decorator;

@ccclass('ResultController')
export class ResultController extends Component {
    @property({type: ScoreController})
    private score: ScoreController;
    
    @property({type: Label})
    private highScore: Label;

    @property({type: Label})
    private urScore: Label;

    @property({type: Button})
    private btnPlayAgain: Button;

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

    onClickBtnAgain(){
        director.loadScene('Play')
    }

    showResult(){
        this.node.active = true;
    }

    hideResult(){
        this.node.active = false;
    }
}


