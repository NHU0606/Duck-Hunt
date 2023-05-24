import { _decorator, Component, Node, director, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BtnController')
export class BtnController extends Component {
    @property({type:Button})
    private musicBtn: Button;

    @property({type: Button})
    private playBtn: Button;

    @property({type: Button})
    private helpBtn: Button;
    
    onclickBtnPlay(){
        director.loadScene('Setting')
    }

    onclickBtnHelp(){
        director.loadScene('Help')
    }

    onclickBtnNext(){
        director.loadScene('Setting')
    }     
}
