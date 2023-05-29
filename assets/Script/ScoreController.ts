import { _decorator, Component, LabelComponent, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreController')
export class ScoreController extends Component {
    public curScore: number = 0;

    updateScore(num: number) {
        this.curScore = num;
        this.node.getComponent(LabelComponent).string =`Score: ` + String(this.curScore) ;
        let maxScore = parseInt(localStorage.getItem('highscore'))

        if(maxScore < num) {
            localStorage.setItem('highscore', String(num))
        }
    }

    addScore(){
        const updatedScore = this.curScore + 1;
        this.updateScore(updatedScore);
    }
}


