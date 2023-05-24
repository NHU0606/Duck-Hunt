import { _decorator, Component, Node, Button, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EntryController')
export class EntryController extends Component {
    @property({type:Button})
    private musicBtn: Button;

    @property({type: Button})
    private startBtn: Button;

    @property({type: Button})
    private helpBtn: Button;
    
    onclickBtnStart(){
        director.loadScene('Setting')
    }

    onclickBtnHelp(){
        director.loadScene('Help')
    }

    onclickBtnMusic(){
        // director.loadScene('Setting')
    }     
}


