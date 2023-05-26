import { _decorator, Component, LabelComponent, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreController')
export class ScoreController extends Component {
    public curScore: number = 0;

    protected updateScore(num: number): void {
        this.curScore = num;
        this.node.getComponent(LabelComponent).string = String(this.curScore);
        let maxScore = parseInt(localStorage.getItem('highscore'))

        if(maxScore < num) {
            localStorage.setItem('highscore', String(num))
        }
    }

    addScore(){
        this.updateScore(this.curScore + 1)
    }
}


