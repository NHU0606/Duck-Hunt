import { _decorator, Component, Label, Node, Button, Sprite, director } from 'cc';
import { ScoreController } from './ScoreController';
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

    onClickBtnAgain(){
        director.loadScene('Play')
    }

    showResult(){
        let maxScore = parseInt(localStorage.getItem('highscore'))
        this.highScore.string = `High score: ${maxScore}`;
        this.urScore.string = `Your score: ${this.score.curScore}`;
        this.node.active = true;
    }

    hideResult(){
        this.node.active = false;
    }   

    private onClickAgain() : void {
        director.loadScene('Play');
    }

    private onClickMenu() : void {
        director.loadScene('Entry');
    }

}


