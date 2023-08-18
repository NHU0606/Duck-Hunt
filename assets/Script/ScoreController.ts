import { _decorator, Component, LabelComponent, Node } from 'cc';
import { Data } from './Data';
const { ccclass, property } = _decorator;

@ccclass('ScoreController')
export class ScoreController extends Component {
    public curScore: number = 0;

    updateScore(num: number) {
        try {
            this.curScore = num;
            this.node.getComponent(LabelComponent).string =`Score: ` + String(this.curScore) ;
            let maxScore = parseInt(localStorage.getItem(Data.highscore))
    
            if(maxScore < num) {
                localStorage.setItem(Data.highscore, num.toString())
            } else {
                if (Data.highScoreStatic < num) {
                    Data.highScoreStatic = num;
                }
            }
        } catch (error) {
            if (Data.highScoreStatic < num) Data.highScoreStatic = num;
        }
    }

    addScore(){
        this.updateScore(this.curScore + 1);
    }

    hideScore() {
        this.node.getComponent(LabelComponent).string = '';
    }
}


